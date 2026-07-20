from flask import Flask, render_template, redirect, url_for, flash, make_response
from flask import request
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    logout_user,
    login_required,
    current_user
)
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length
from dotenv import load_dotenv
import os

load_dotenv('dbconfig.env')

app = Flask(__name__)

app.secret_key = os.getenv("SECRET_KEY")

app.config["MYSQL_HOST"] = os.getenv("MYSQL_HOST")
app.config["MYSQL_USER"] = os.getenv("MYSQL_USER")
app.config["MYSQL_PASSWORD"] = os.getenv("MYSQL_PASSWORD")
app.config["MYSQL_DB"] = os.getenv("MYSQL_DB")

mysql = MySQL(app)
bcrypt = Bcrypt(app)


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


class User(UserMixin):

    def __init__(self, id, username):
        self.id = id
        self.username = username


@login_manager.user_loader
def load_user(user_id):

    cur = mysql.connection.cursor()

    cur.execute(
        """ SELECT * FROM usuarios WHERE id=%s """, (user_id,)
    )

    user = cur.fetchone()

    cur.close()

    if user:

        return User(
            id=user[0],
            username=user[1]
        )

    return None


class LoginForm(FlaskForm):

    username = StringField(
        "Usuario",
        validators=[
            DataRequired(),
            Length(min=4, max=50)
        ]
    )

    password = PasswordField(
        "Contraseña",
        validators=[
            DataRequired(),
            Length(min=6)
        ]
    )

    submit = SubmitField("Ingresar")


class RegisterForm(FlaskForm):

    names = StringField(
        "Nombres",
        validators=[
            DataRequired(),
            Length(max=75)
        ]
    )

    surnames = StringField(
        "Apellidos",
        validators=[
            DataRequired(),
            Length(max=100)
        ]
    )

    email = StringField(
        "Correo electrónico",
        validators=[
            DataRequired(),
            Length(max=75)
        ]
    )

    number = StringField(
        "Número de teléfono",
        validators=[
            Length(max=9)
        ]
    )

    username = StringField(
        "Usuario",
        validators=[
            DataRequired(),
            Length(min=4, max=50)
        ]
    )

    password = PasswordField(
        "Contraseña",
        validators=[
            DataRequired(),
            Length(min=6, max=15)
        ]
    )

    submit = SubmitField("Registrarse")


def add_no_cache_headers(response):

    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"

    return response


@app.route("/")
def index():

    if current_user.is_authenticated:
        return redirect(url_for("home"))

    return redirect(url_for("login"))


@app.route("/login", methods=["GET", "POST"])
def login():

    if current_user.is_authenticated:
        return redirect(url_for("home"))

    form = LoginForm()

    if form.validate_on_submit():

        username = form.username.data
        password = form.password.data

        cur = mysql.connection.cursor()

        cur.execute(
            """ SELECT * FROM usuarios WHERE nombre_usuario=%s """, (username,)
        )

        user = cur.fetchone()
        cur.close()

        if user:
            if bcrypt.check_password_hash(user[7], password):
                usuario = User(id=user[0], username=user[4])

                login_user(usuario)

                return redirect(url_for("home"))

        flash("Usuario o contraseña incorrectos")

        return redirect(url_for("login"))

    response = make_response(render_template("login.html", form=form))

    return add_no_cache_headers(response)


@app.route("/register", methods=["GET", "POST"])
def register():

    if current_user.is_authenticated:
        return redirect(url_for("home"))

    form = RegisterForm()

    if form.validate_on_submit():

        names = form.names.data
        surnames = form.surnames.data
        username = form.username.data
        email = form.email.data
        number = form.number.data
        password = form.password.data

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        cur = mysql.connection.cursor()

        cur.execute(
            """ SELECT id FROM usuarios WHERE nombre_usuario=%s OR correo=%s """, (username, email)
        )

        existe = cur.fetchone()

        if existe:

            cur.close()

            flash("Ese usuario ya existe.")

            return redirect(url_for("register"))

        cur.execute(
            """ INSERT INTO usuarios (id_rol, nombres, apellidos, nombre_usuario, correo, numero, contrasenia)
                VALUES(2,%s,%s,%s,%s,%s,%s) """, (names, surnames, username, email, number, hashed_password)
        )

        mysql.connection.commit()

        cur.close()

        flash("Registro exitoso")

        return redirect(url_for("login"))

    response = make_response(render_template("register.html", form=form))

    return add_no_cache_headers(response)


@app.route("/home")
@login_required
def home():

    response = make_response(render_template("home.html", usuario=current_user))

    return add_no_cache_headers(response)


@app.route("/logout")
@login_required
def logout():

    logout_user()

    response = make_response(redirect(url_for("login")))

    return add_no_cache_headers(response)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)