# RuinsOfLight

Juego online cooperativo para dos personas en el que los dos jugadores exploran las ruinas de una antigua civilización enfrentándose a los guardianes de dicha civilización.

Integrantes:

-Sergio Montes Veredas s.montesv.2018@alumnos.urjc.es MrSergio99

-Sara Fuente Águila s.fuente.2018@alumnos.urjc.es SaraFuente

-Juan Jesús Rodríguez Sánchez jj.rodriguez.2018@alumnos.urjc.es JuanJesus5

-María Hidalga de la Fuente m.hidalga.2016@alumnos.urjc.es mariahidalgaf

-Daniel Martí Casanova d.marti.2018@alumnos.urjc.es damacaa

https://trello.com/b/W579zLya/ruins-of-light

0.-DATOS DEL PROYECTO Título: Ruins Of Light Game Design Document Diciembre 2020 Fase 2: JER2021-MOS-08
Equipo de Desarrollo: Sergio Montes Veredas. Sara Fuente Águila. Juan Jesús Rodríguez Sánchez. María Hidalga de la Fuente. Daniel Martí Casanova.

1.-INTRODUCCIÓN Acción: los jugadores deben emplear su velocidad, destreza en el control y tiempo de reacción para derrotar a los distintos enemigos que irán surgiendo a lo largo del juego.

Plataformas 2D: los jugadores tienen que saltar sobre plataformas suspendidas o a lo largo de obstáculos y enemigos hasta llegar a una meta. Utiliza gráficos con apariencia plana y un scroll horizontal de la pantalla.

Plataforma: El navegador de PC.

Versión:1.0

Sinopsis del Juego: Dos hermanos tratan de encontrar las ruinas de una antigua civilización. Tras varios años de investigación encuentran un templo antiguo en el que quedan atrapados y las defensas de la antigua civilización tratarán de no dejarles escapar con vida.

Categoría: El juego se inspira en juegos como Risk of Rain*, Dead Cells*, entre otros. Se trata de un juego de acción cooperativo en red de plataformas 2D, estilo pixel art. Ambientado en las ruinas de una antigua civilización, en concreto un templo. En este nos enfrentaremos a distintos enemigos que irán apareciendo a medida que avanzamos en las tareas de forma procedural. Ambos jugadores cooperarán para superar los distintos escenarios.

* Ref. Risk Of Rain: https://hopoogames.com/risk-of-rain/
* Ref. Dead Cells: https://deadcells.com/


Dinámica: Cooperación de dos jugadores en red con distintas armas, que combinadas les permitirán escapar de un templo lleno de enemigos.

Licencia: CC BY-NC-ND (Reconocimiento-NoComercial-SinObraDerivada)

Público: Joven-Adulto-Amantes del Arcade. Se trata de una trama sencilla. Es un juego que permite jugar tanto sesiones largas por su rejugabilidad como de forma esporádica. Está destinado tanto al público que consume habitualmente videojuegos como para quienes tienen un contacto más esporádico. StoryBoard:

![alt tag](/resources/img/ReadMe/Storyboard.png)


Visión general del juego: Ruins Of Light es un juego que toma referencias de las leyendas que mencionan que una antigua civilización dejó templos repartidos por toda la tierra: la Atlántida, las pirámides egipcias, las piedras de Stonehenge… Propósito: Ruins Of Light busca la cooperación en red entre dos jugadores, proporcionándoles retos tales como explorar los más profundos rincones de una pirámide maya en la que existen unos tesoros o reliquias que despertarán los más fieros guardianes de una antiquísima civilización nunca antes conocida. Los dos jugadores deberán luchar codo con codo enfrentándose a infinidad de enemigos, incluidos los guardianes, si quieren poder escapar de este templo que los protagonistas hallaron tras años de investigaciones. Las mecánicas de los enemigos y escenarios están diseñadas precisamente para lograr ese objetivo.

2.-JUGABILIDAD El jugador podrá moverse en un plano 2D a través de distintos escenarios, con un avance lineal pasando por cada uno de los jefes. El sistema de derrota de este juego, se produce si alguno de los dos jugadores, pierde todas sus vidas (7), el juego muestra una pantalla de “Game Over”, y de nuevo habrá que comenzar una nueva partida desde el menú principal. Cámara: 2D siguiendo lateralmente y verticalmente a los protagonistas. Controles: Teclado y ratón. Ratón: Click izquierdo: Ataque. Click derecho: Interacción. Teclado: A: Desplazarse hacia la izquierda. D: Desplazarse hacia la derecha. W / SpaceBar: Saltar. Esc: Menú. Puntuación: No se dispone de un contador de misiones, pero existen tantas estatuas como bosses, y para poder escapar del templo se deben derrotar a todos ellos. El jugador será consciente de esta situación mediante una pequeña introducción , y los jefes son estatuas visibles en todo momento en el Gran Salón. Guardar/Cargar: No se dispone de sistema de guardado. Flujo de pantallas: Los jugadores comienzan en la pantalla del menú principal, compuesta por el título del juego y el botón de inicio. Cuando se pulsa el botón de inicio, se muestran una secuencia de imágenes que sitúan al jugador en el contexto del juego. A continuación aparecen los dos jugadores en una sala del templo donde cada uno elige su arma. Acto seguido los jugadores tendrán libertad para explorar el templo y completar así las misiones en las que se generarán combinaciones aleatorias de enemigos, regresando al Gran Salón para enfrentarse a los jefes tras cada misión. Diagrama de Flujo: 

![alt tag](/resources/img/ReadMe/Diagrama.jpeg) 


Escenas:

![alt tag](/resources/img/ReadMe/Menu.png)
![alt tag](/resources/img/ReadMe/Intro.png)
![alt tag](/resources/img/ReadMe/Cinematica.png)
![alt tag](/resources/img/ReadMe/Altares.png)
![alt tag](/resources/img/ReadMe/GranSalon.png)
![alt tag](/resources/img/ReadMe/Templo.png)
![alt tag](/resources/img/ReadMe/Creditos.png)
![alt tag](/resources/img/ReadMe/GameOver.png)


Escenarios:

Templo: El templo está formado por piedra y algunos grabados luminosos principalmente. El juego consta de dos salas o “rooms” principales (Altares y Gran Salón). El resto de salas del templo están interconectadas entre sí mediante puertas, de manera que el jugador puede desplazarse libremente por todo el mapa. Entre ellas distinguimos algunas más importantes, que destacamos a continuación.

Altares: Posición: Primera escena jugable tras pulsar el inicio del juego. Descripción: En esta sala los dos jugadores quedan atrapados dentro del templo y ante ellos aparecen dos altares en los que reposan las dos armas principales del juego, una espada y un arco pertenecientes a la antigua civilización. Cada jugador elige una de las armas y pasan al salón principal del templo, que es la siguiente sala. Objetivos: El objetivo de esta sala es elegir el arma que el jugador desea emplear. Progreso: Cambia de escena cuando los jugadores eligen un arma y abandonan la sala. Enemigos: En este nivel no hay enemigos. Ítems: Nos encontramos las dos armas principales del juego. La espada y el arco. Personajes: En este nivel aparecen ambos protagonistas.

Gran Salón: Posición: Se encuentra después de la sala de los altares. Se trata de una sala recurrente en la que los jugadores tendrán que volver para los enfrentamientos con los bosses. Descripción: Se trata de un gran salón en el que vemos una serie de estatuas antiguas que simbolizan los bosses de esa antigua civilización. Tras lograr cumplir un objetivo/misión, el boss asociado a esa misión nos esperará en este salón donde tendrá lugar la batalla. Cuando derrotemos a todos se abrirán las puertas del templo y los jugadores podrán escapar. Objetivos: Derrotar a cada uno de los bosses. Progreso: Tras derrotar a los bosses permite nuevamente abandonar esta sala y progresar con la exploración. Enemigos: En esta sala se enfrentan a los enemigos principales del juego que son los bosses. El boss con el que se lucha dependerá de la misión que se supere, la cual está asociada a un único boss. Ítems: Estatuas simbólicas de cada boss. Personajes: En este nivel aparecen ambos protagonistas.

Personajes:

Personaje 1 - Protagonista Nombre: Player 0 Descripción: Uno de los jóvenes hermanos exploradores. Se caracteriza por ser un espíritu aventurero, más animado e impulsivo que su hermano. Su propósito es explorar y escapar del templo con la ayuda de su hermano para descubrir sus misterios.

 ![alt tag](/resources/img/ReadMe/P0.png)


Concepto:Personaje principal. Es uno de los dos protagonistas. Se enfrenta a los enemigos que aparecen en el templo para sobrevivir y escapar hasta llegar al final. Momento: Al ser uno de los personajes principales, aparece durante todo el juego. Habilidades: Es capaz de luchar contra los enemigos con la espada de forma directa y con el arco a distancia. Armas: Espada o arco según elección. Objetos: No tiene. NPC: No.
Personaje 2 - Protagonista Nombre: Player 1 Descripción: Hermano menor de los exploradores. Se caracteriza por ser más cauto, sereno y tranquilo . Acompaña a su hermano en su lucha por conocer los rincones del templo en el que se encuentran. 

![alt tag](/resources/img/ReadMe/P1.png)


Concepto: Personaje principal. Es uno de los dos protagonistas. Se enfrenta a los enemigos que aparecen en el templo para sobrevivir y llegar al final. Momento: Al ser uno de los personajes principales, aparece durante todo el juego. Habilidades: Es capaz de luchar contra los enemigos con la espada de forma directa y con el arco a distancia. Armas:Espada o arco según elección. Objetos: No tiene. NPC: No.
Enemigos: Descripción: Seres hechos de roca y energía que se encontraban desactivados hasta la llegada de ambos protagonistas. Sus cuerpos tienen grabados de la antigua civilización y son capaces de manifestar movimiento gracias a la energía interna que poseen.

Guardian Rodante: Descripción:Enemigo con forma de bola. Rueda en dirección de sus enemigos y explota si está cerca de los jugadores produciendo un gran daño. Solo es vulnerable a los ataques instantes antes de colisionar con el enemigo. Imagen: Véase imagen en el documento GDD. Concepto: Personaje secundario. Estos enemigos tienen el propósito de impedirles el paso a los dos jugadores. Momento: Durante todo el transcurso del juego, generados de forma procedural. Habilidades: Explosión al colisionar con un enemigo. Armas: -. Objetos: No tiene. NPC: Son los enemigos básicos, no son jugables.

Guardián: Descripción: Se trata de un enemigo a modo de soldado que defiende el templo. Es un enemigo que carece de piernas y se arrastra por el suelo acercándose a su enemigo al que atacará con sus propias manos. Imagen: Véase imagen en el documento GDD. Concepto: Personaje secundario. Estos enemigos tienen el propósito de impedirles el paso a los dos jugadores. Momento: Durante todo el transcurso del juego, generados de forma procedural. Habilidades: Ataque con sus manos de piedra. Armas: -. Objetos: No tiene. NPC: Son los enemigos básicos, no son jugables.
Guardián volador: Descripción: Se trata de un enemigo con forma de tostadora que vuela por una energía desconocida. Cuando aparece se aleja lo máximo posible de los jugadores y les ataca desde lejos, evitando así ser alcanzado. Concepto: Personaje secundario. Estos enemigos tienen el propósito de impedirles el paso a los dos jugadores. Momento: Durante todo el transcurso del juego, generados de forma procedural. Habilidades: Ataque aéreo mediante bola de energía. Armas:-. Objetos:No tiene. NPC: Son los enemigos básicos, no son jugables.

Gran Guardián Gorila: Descripción: Enemigo principal. Es un líder de la antigua civilización. Tiene una vida superior al resto de enemigos. Sus puños son poderosos e intenta machacar con ellos a sus enemigos. Concepto: Jefe Final. Estos enemigos son más difíciles de derrotar, una vez derrotados, te permiten seguir avanzando. Momento: Cada vez que los jugadores completan una o varias misiones, son generados siempre en el Gran Salón. Habilidades: Golpe de Puños. Armas:-. Objetos: Posee una armadura que le protege del daño. NPC: Son los enemigos principales del juego o jefes, no son jugables. 

Assets Clave:

Altares: Pedestales o soportes donde reposan ambas armas. 

![alt tag](/resources/img/ReadMe/AltarEspada.png)
![alt tag](/resources/img/ReadMe/AltarArco.png)


Espada: Arma que permite atacar a los enemigos terrestres. Su portador podrá elegir la dirección del ataque. Arco: Arma que permite atacar a los enemigos a distancia. Su portador podrá elegir la dirección del ataque. 

3.-INTERFAZ Esta sección abarca los elementos visibles que componen la pantalla de juego. Inicialmente se mostrarán los bocetos y el equipo de diseño se encargará de su actualización dentro del presente documento. También se describen los conceptos relacionados con la apariencia del juego, paleta de colores, ambientación...

Nombre de la pantalla: Menú principal. Descripción de la pantalla: Muestra un fondo con el templo maya donde transcurre el juego, visto desde el exterior. En la imagen en su parte superior se puede leer el título del juego “Ruins of Light”  y en el centro,escorado a la izquierda, aparecen las opciones de Nuevo Juego y Créditos. 

Nombre de la pantalla: Intro. Descripción de la pantalla: Se trata de una sucesión de imágenes que sirven de explicación breve de la narrativa del juego para los jugadores que jueguen por primera vez, siendo posible saltársela en futuras partidas por los jugadores que ya conocen dicha historia. Finaliza con una pequeña cinemática explicando el objetivo principal del juego, justo antes de comenzar la aventura.

Nombre de la pantalla: Créditos. Descripción de la pantalla: Aparece una pantalla con los nombres de todos los desarrolladores del juego. 

Nombre de la pantalla: Game Over. Descripción de la pantalla: Aparece una pantalla con dos cadáveres de serpientes entrelazadas con la palabra Game Over. Ambas serpientes hacen referencia a las serpientes que representan la barra de vida de los jugadores. 

4.-ARTE Colores: Paleta de colores: 

![alt tag](/resources/img/ReadMe/Paleta.jpg)


Saturación: La saturación será media, con colores llamativos pero no estridentes.

Música: Altares: Música pausada y relajada constante. Gran Salón: Música relajada y pausada hasta que ocurra un enfrentamiento, entonces la música se acelera. Resto de zonas: Música pausada hasta enfrentamiento. 
*Efectos: Ataque Espada, Ataque enemigos, Despertar y Muerte de guardianes jefes, Ataque Arco, Puertas…
*Efectos: algunos efectos como los del gorila han tenido que ser descargados y adaptados para el juego. Concretamente la referencia es:http://recursostic.educacion.es/bancoimagenes/web/
 
Arte conceptual: Guía de estilo: El estilo artístico empleado para los personajes y los escenarios es el pixel art. Los distintos personajes tendrán animaciones de movimiento, ataque, salto, etc. Los escenarios toman inspiración de antiguas civilizaciones. La arquitectura se caracteriza por emplear piedra con detalles de luz emisiva que representa la energía que recorre el templo y a sus guardianes. Galería de imágenes: Véanse imágenes en la carpeta de recursos del siguiente enlace.
https://github.com/damacaa/RuinsOfLight/tree/main/resources
 

