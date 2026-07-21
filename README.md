# Dependecias

> Debido a un conflicto en dependencias, protobuf debe ser instalado después de usar el archivo "librerias.txt", ya que para la versión de tensorflow y keras usadas se está usando la 3.19.3, que en teoría es un soporte para ambas dependencias, pero en la práctica hay dependencias de versiones posteriores de protobuf que no existen para la versión soporte.
> Por ende, se debe cambiar protobuf de 3.19.3 a 3.20.3 después de aplicar pip install -r librerias.txt.