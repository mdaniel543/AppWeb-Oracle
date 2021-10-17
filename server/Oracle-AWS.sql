Create table Departamento(
    DepaID Number GENERATED BY DEFAULT AS IDENTITY,
    Nombre Varchar(55) NOT NULL,
    CapitalTotal float(4) NOT NULL,
    DepartamentoID Number,
    PRIMARY KEY (DepaID),
    FOREIGN KEY (DepartamentoID) REFERENCES Departamento(DepaID)
);

Create table Puesto(
    PuestoID Number GENERATED BY DEFAULT AS IDENTITY,
    Nombre Varchar(55) UNIQUE NOT NULL ,
    Salario float(4) NOT NULL,
    Imagen Varchar(200),
    PRIMARY KEY (PuestoID)
);

Create Table Depa_Puesto(
    Depa_Puesto_ID Number GENERATED BY DEFAULT AS IDENTITY,
    DepartamentoID Number,
    PuestoID Number,
    PRIMARY KEY (Depa_Puesto_ID),
    FOREIGN KEY (DepartamentoID) REFERENCES Departamento(DepaID),
    FOREIGN KEY (PuestoID) REFERENCES Puesto(PuestoID)
);

Create table Requisito(
    RequisitoID Number GENERATED BY DEFAULT AS IDENTITY,
    Nombre Varchar(55) NOT NULL,
    Tamanio Number,
    Obligatorio Char(2),
    PRIMARY KEY (RequisitoID)
);

Create Table Puesto_Requisito(
    Puesto_Requi_ID Number GENERATED BY DEFAULT AS IDENTITY,
    RequisitoID Number,
    PuestoID Number,
    PRIMARY KEY (Puesto_Requi_ID),
    FOREIGN KEY (RequisitoID) REFERENCES Requisito(RequisitoID),
    FOREIGN KEY (PuestoID) REFERENCES Puesto(PuestoID)
);

Create table Formato(
    FormatoID Number GENERATED BY DEFAULT AS IDENTITY,
    Nombre Varchar(55) UNIQUE NOT NULL,
    PRIMARY KEY (FormatoID)
);

Create Table Requisito_Formato(
    Requi_Forma_ID Number GENERATED BY DEFAULT AS IDENTITY,
    FormatoID Number,
    RequisitoID Number,
    PRIMARY KEY (Requi_Forma_ID),
    FOREIGN KEY (FormatoID) REFERENCES Formato(FormatoID),
    FOREIGN KEY (RequisitoID) REFERENCES Requisito(RequisitoID) 
);

Create Table Categoria(
    CategoriaID Number GENERATED BY DEFAULT AS IDENTITY,
    Nombre Varchar(45) UNIQUE NOT NULL,
    PRIMARY KEY(CategoriaID)
);

Create Table Puesto_Cate(
    Puesto_Cate_ID Number GENERATED BY DEFAULT AS IDENTITY,
    CategoriaID Number,
    PuestoID Number,
    PRIMARY KEY (Puesto_Cate_ID),
    FOREIGN KEY (CategoriaID) REFERENCES Categoria(CategoriaID),
    FOREIGN KEY (PuestoID) REFERENCES Puesto(PuestoID) 
);

CREATE Table Rol(
    RolID Number GENERATED BY DEFAULT AS IDENTITY,
    Nombre Varchar(45),
    PRIMARY KEY (RolID)
);

CREATE TABLE Personal (
    PersonalID Number GENERATED BY DEFAULT AS IDENTITY,
    Usuario Varchar(55) UNIQUE NOT NULL,
    Contrasenia Varchar(100) NOT NULL,
    Estado Char(2) NOT NULL,
    Fecha_Inicio DATE,
    Fecha_Fin DATE,
    RolID Number,
    DepartamentoID Number,
    PRIMARY KEY (PersonalID),
    FOREIGN KEY (RolID) REFERENCES Rol(RolID),
    FOREIGN KEY (DepartamentoID) REFERENCES Departamento(DepaID)
);

CREATE TABLE Aplicante (
    CUI Number PRIMARY KEY,
    Nombre Varchar(45) NOT NULL,
    Apellido Varchar(45) NOT NULL,
    Correo Varchar(100) NOT NULL,
    Direccion Varchar(65) NOT NULL,
    Telefono Number NOT NULL,
    CV Varchar(200) NOT NULL,
    Apto Char(2),
    Fecha_Postulacion DATE,
    Estado_Expediente Char(2),
    Planilla Char(2),
    Depa_Puesto_ID number,
    PersonalID number,
    FOREIGN KEY (Depa_Puesto_ID) REFERENCES Depa_Puesto(Depa_Puesto_ID),
    FOREIGN KEY (PersonalID) REFERENCES Personal(PersonalID)
);

CREATE TABLE login (
    Id Number GENERATED BY DEFAULT AS IDENTITY,
    Usuario Varchar(45) NOT NULL,
    Contrasenia Varchar(100) NOT NULL,
    RolID number NOT NULL,
    AplicanteCUI number UNIQUE,
    PRIMARY KEY (Id),
    FOREIGN KEY (AplicanteCUI) REFERENCES Aplicante(CUI),
    FOREIGN KEY (RolID) REFERENCES Rol(RolID)
);

CREATE TABLE Archivo(
    ArchivoID Number GENERATED BY DEFAULT AS IDENTITY,
    Ruta Varchar(200) NOT NULL,
    Aceptado Char(1),
    Motivo Varchar(250),
    Rechazado number,
    AplicanteCUI number, 
    PRIMARY KEY (ArchivoID),
    FOREIGN KEY (AplicanteCUI) REFERENCES Aplicante(CUI)
);


Insert Into Rol(Nombre) Values ('Admin Sistema');
Insert Into Rol(Nombre) Values ('Admin Usuario');

Insert Into login(Usuario, Contrasenia, RolID) Select 'AS', 'S', RolID From Rol Where Nombre = 'Admin Sistema';
Insert Into login(Usuario, Contrasenia, RolID) Select 'AU', 'U', RolID From Rol Where Nombre = 'Admin Usuario';

Select Usuario, Contrasenia, Nombre From login l, Rol r Where l.RolID = r.RolID;
Select Nombre From login l Inner Join Rol r ON l.RolID = r.RolID Where l.Usuario = '' AND l.Contrasenia = '';

Insert Into Departamento(Nombre, CapitalTotal) Values ();
Insert Into Departamento(Nombre, CapitalTotal, DepartamentoID) Select '','', DepaID From Departamento Where Nombre = ;
--
Insert Into Puesto(Nombre, Salario) Select '','' From dual Where NOT EXISTS (Select * From Puesto Where Nombre = '' AND Salario = '')
Insert Into Puesto(Nombre, Salario, Imagen) Select '','','' From dual Where NOT EXISTS (Select * From Puesto Where Nombre = '' AND Salario = '')

Insert Into Depa_Puesto(DepartamentoID, PuestoID) Select DepaID, PuestoID From Departamento d, Puesto p, WHere d.Nombre = '' AND p.Nombre = '';

Insert Into Requisito(Nombre, Tamanio, Obligatorio) Select '','','' From dual WHere NOT EXISTS (Select * FROM Requisito Where Nombre = '' AND Tamanio = '' AND Obligatorio = '');

Insert Into Puesto_Requisito(RequisitoID, PuestoID) Select RequisitoID, PuestoID From Puesto p, Requisito r, WHERE  p.Nombre = '' AND r.Nombre = ''; 

Insert Into Formato(Nombre) Select '' From dual Where NOT EXISTS (Select * From Formato WHERE Nombre = '');

Insert Into Requisito_Formato(FormatoID, RequisitoID) Select FormatoID, RequisitoID From Formato f, Requisito r Where f.Nombre = '' AND r.Nombre = '';

Insert Into Categoria(Nombre) Select '' From dual Where NOT EXISTS (Select * From Categoria WHERE Nombre = '');

Insert Into Puesto_Cate(CategoriaID, PuestoID) Select CategoriaID, PuestoID FROM Categoria c, Puesto p Where c.Nombre = ''AND p.Nombre = '';


Select * From Departamento;
Select * From Puesto;
Select * From Depa_Puesto;
Select * From Requisito;
Select * From Puesto_Requisito;
Select * From Formato;
Select * From Requisito_Formato;
Select * From Categoria;
Select * From Puesto_Cate;

Delete From Departamento;
Delete From Puesto;
Delete From Depa_Puesto;
Delete From Requisito;
Delete From Puesto_Requisito;
Delete From Formato;
Delete From Requisito_Formato;
Delete From Categoria;
Delete From Puesto_Cate;

Select d.Nombre, p.Nombre, p.Salario From Depa_Puesto dp Inner Join Departamento d ON d.DepaID = dp.DepartamentoID Inner Join Puesto p ON p.PuestoID = dp.PuestoID 
Select c.Nombre From Puesto_Cate pc Inner Join Puesto p ON p.PuestoID = pc.PuestoID AND p.Nombre = '' Inner Join Categoria c On C.CategoriaID = pc.CategoriaID;

Insert Into Personal(Usuario, Contraseña, Estado, Fecha_Inicio, RolID, DepartamentoID) Select '', '', '', '', RolID, DepartamentoID FROM Rol r, Departamento d Where r.Nombre = '' AND d.Nombre = '';
Select PersonalID, Usuario, Contraseña, Estado, Fecha_Inicio, Fecha_Fin, r.Nombre, d.Nombre From Personal p Inner Join Rol r ON r.RolID = p.RolID Inner Join Departamento d Inner Join d.DepaID = p.DepartamentoID;
Update Personal Set Usuario = '', Contraseña = '', RolID = (Select RolID From Rol WHERE Nombre = ''), DepartamentoID = (Select DepaID From Departamento WHERE Nombre = '') WHERE PersonalID = '';   
Update Personal Set Estado = '', Fecha_Fin = '' WHERE PersonalID = '';   

Select Count(*) FROM Personal p Inner Join Departamento d ON d.DepaID = p.DepartamentoID AND d.Nombre = "" Inner Join Rol r On r.RolID = p.RolID AND r.Nombre = 'Coordinador';
Select Nombre From Departamento;