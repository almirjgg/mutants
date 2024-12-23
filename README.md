# Challenge Mutantes

Este repositorio contiene la solución al Challenge Mutantes, una aplicación que permite determinar si una secuencia de ADN corresponde a un mutante, además de proporcionar estadísticas detalladas sobre los análisis realizados.

---

## Descripción del Proyecto

La aplicación expone una API REST que ofrece dos funcionalidades principales:

- **Detección de mutantes**: A través del endpoint `/mutant`, analiza secuencias de ADN para determinar si pertenecen a un mutante.
- **Estadísticas**: A través del endpoint `/stats`, proporciona un resumen estadístico de los análisis realizados.

---

## Tecnologías Utilizadas

Este proyecto está construido con las siguientes tecnologías y herramientas:

- **TypeScript**: Lenguaje principal del desarrollo, tipado estático para mayor seguridad y escalabilidad.
- **Express.js**: Framework para construir la API REST.
- **PostgreSQL**: Base de datos relacional para almacenar la información de los análisis.
- **TypeORM**: ORM para interactuar con la base de datos de manera eficiente y estructurada.
- **Docker**: Herramienta para contenedores que simplifica el despliegue.

---

## Instrucciones de Ejecución

Sigue los pasos a continuación para ejecutar la aplicación en tu entorno local:

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/almirjgg/mutants.git
   ```

2. **Instalar las dependencias**:

   ```bash
   cd <directorio_del_proyecto>
   yarn install
   ```

3. **Configurar la base de datos**:

   - Crea una base de datos PostgreSQL llamada `mutant_challenge_db`.
   - Ajusta las credenciales de la base de datos en el archivo `.env`.

   ```env
     DB_USERNAME=mutant_challenge
     DB_PASSWORD=postgres
     DB_DATABASE=mutant_challenge_db
   ```

   - Estas mismas credenciales también serán utilizadas por el archivo `docker-compose.yml` para facilitar la configuración del entorno Docker.

4. **Levantar la aplicación en modo desarrollo**:

   ```bash
   yarn dev
   ```

5. **Opcional**: Ejecutar la aplicación con Docker:

   ```bash
   docker-compose up
   ```

---

## API URL

Una vez la aplicación esté en ejecución, la API estará disponible en:

```bash
http://localhost:3030
```

---

## Endpoints de la API

### **`/mutant`**

**Método**: `POST`

**Descripción**: Analiza una secuencia de ADN y determina si pertenece a un mutante.

**Cuerpo de la petición**:

```json
{
  "dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
}
```

**Respuestas posibles**:

- `200 OK`: Si la secuencia corresponde a un mutante.
- `403 Forbidden`: Si la secuencia no corresponde a un mutante.

---

### **`/stats`**

**Método**: `GET`

**Descripción**: Devuelve estadísticas sobre los análisis realizados.

**Respuesta**:

```json
{
  "count_mutant_dna": 40,
  "count_human_dna": 100,
  "ratio": 0.4
}
```

---

## Estructura del Proyecto

El proyecto sigue una arquitectura limpia y modular basada en principios de Domain-Driven Design (DDD). La estructura principal es:

- **`api`**: Contiene la lógica de la API REST, incluidos controladores y rutas.
- **`shared`**: Código compartido entre distintas partes de la aplicación, como configuraciones y lógica de dominio.
- **`shared/contexts/human`**: Incluye la lógica específica del contexto "human", separando las capas de dominio, aplicación e infraestructura.

---

## Pruebas Unitarias

El proyecto incluye pruebas unitarias para los componentes principales. Para ejecutarlas:

```bash
yarn test
```

---

## Mejores Prácticas

Este proyecto implementa las siguientes prácticas de ingeniería de software:

- **Inyección de dependencias**: Facilita el mantenimiento y las pruebas.
- **Arquitectura limpia**: Asegura modularidad y separación de responsabilidades.
- **Pruebas unitarias**: Garantizan la calidad del código.
- **Docker**: Simplifica el despliegue en cualquier entorno.

---

## Autor

**Almir Garcia**

---

## Licencia

Este proyecto está licenciado bajo la [MIT License](https://choosealicense.com/licenses/mit/).
