# Changarrito Mobile

> Todo tu changarro en un solo lugar.

Aplicación móvil desarrollada con React Native y Expo para el Sprint 3.

## Tecnologías

- React Native
- Expo SDK 57
- TypeScript
- React Navigation
- AsyncStorage
- Jest
- React Native Testing Library
- ESLint
- Prettier

## Arquitectura

El proyecto utiliza:

- MVVM
- SOLID
- Inyección de dependencias
- Repository Pattern
- Data Sources
- Use Cases
- Composition Root

La dirección principal de dependencias es:

Presentation → Domain ← Data

Core contiene infraestructura transversal reutilizable.

## Capas

### Domain

Contiene las reglas y abstracciones del negocio.

No debe depender de:

- React
- React Native
- Expo
- AsyncStorage
- React Navigation
- Data
- Presentation

### Data

Contiene:

- DTO
- Mappers
- Data Sources
- Implementaciones de Repository

Es la capa responsable de comunicarse con fuentes externas.

### Presentation

Contiene:

- Screens
- ViewModels
- UI State
- Components específicos de cada feature

Las Screens no acceden directamente a APIs, AsyncStorage o repositories concretos.

### Core

Contiene infraestructura común:

- HTTP
- Storage
- Errores
- Configuración
- Dependency Injection

### Shared

Contiene únicamente elementos visuales reutilizables:

- Theme
- Botones
- Inputs
- Cards
- Modales
- Búsquedas
- Estados visuales

Shared no contiene lógica de negocio.

## Flujo general

View  
↓  
ViewModel  
↓  
Use Case  
↓  
Repository Interface  
↓  
Repository Implementation  
↓  
Data Source  
↓  
API / Storage

## Dependency Injection

Las clases reciben sus dependencias mediante constructor o factories.

Las dependencias concretas se construyen en el Composition Root.

No se permite crear repositories concretos directamente dentro de ViewModels o Use Cases.

## Ejecutar el proyecto

Instalar dependencias:

```bash
npm ci
```
