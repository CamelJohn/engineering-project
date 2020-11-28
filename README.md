# **Anomalees Commitee**

```yml
  This is the backend for my engineering project.
  
  It's purpose is to:

  1. Process excell files representing:

    - course curriculum
    - student grades and overall state

  2. Persist the data to a postgresql database

  3. Serve as a REST API (later to be changed to an Electron App)

```

## **Processing excell files**
<hr>

```yml
The excell files need to be processed so they can be later used within the program/app.

To do so I used the xlsx lib.
```


## **Persisting Data to the database**
<hr>

```yml
The app persists data to a predefined local database (postgresql).
```

## **Main functional requirements**
<hr>

```yml
1. The Program needs to ingest an excell file (curriculum) & display is visually as tree of dependencies.

2. The Program should be able to define base on said 'tree' the academic state of a student.

3. The program should be able to display a student's academic state on the 'tree', giving clear indication of his/her academic state.
```