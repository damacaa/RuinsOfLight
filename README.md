# RuinsOfLight

VIDEO YOUTUBE: https://youtu.be/w5UHlaXmtc4

Juego online cooperativo para dos personas en el que los dos jugadores exploran las ruinas de una antigua civilización enfrentándose a los guardianes de dicha civilización.

Integrantes:

-Sergio Montes Veredas s.montesv.2018@alumnos.urjc.es MrSergio99

-Sara Fuente Águila s.fuente.2018@alumnos.urjc.es SaraFuente

-Juan Jesús Rodríguez Sánchez jj.rodriguez.2018@alumnos.urjc.es JuanJesus5

-María Hidalga de la Fuente m.hidalga.2016@alumnos.urjc.es mariahidalgaf

-Daniel Martí Casanova d.marti.2018@alumnos.urjc.es damacaa

https://trello.com/b/W579zLya/ruins-of-light

0.-DATOS DEL PROYECTO 
Título: Ruins Of Light Game Design Document Enero 2021

Fase 4/5: JER2021-MOS-08

Equipo de Desarrollo: Sergio Montes Veredas. Sara Fuente Águila. Juan Jesús Rodríguez Sánchez. María Hidalga de la Fuente. Daniel Martí Casanova.


1.-INTRODUCCIÓN Acción: los jugadores deben emplear su velocidad, destreza en el control y tiempo de reacción para derrotar a los distintos enemigos que irán surgiendo a lo largo del juego.

Plataformas 2D: los jugadores tienen que saltar sobre plataformas suspendidas o a lo largo de obstáculos y enemigos hasta llegar a una meta. Utiliza gráficos con apariencia plana y un scroll horizontal de la pantalla.

Plataforma: El navegador de PC.

Versión:3.0

Sinopsis del Juego: Dos hermanos tratan de encontrar las ruinas de una antigua civilización. Tras varios años de investigación encuentran un templo antiguo en el que quedan atrapados y las defensas de la antigua civilización tratarán de no dejarles escapar con vida.

Categoría: El juego se inspira en juegos como Risk of Rain*, Dead Cells*, entre otros. Se trata de un juego de acción cooperativo en red de plataformas 2D, estilo pixel art. Ambientado en las ruinas de una antigua civilización, en concreto un templo. En este nos enfrentaremos a distintos enemigos que irán apareciendo a medida que avanzamos en las tareas de forma procedural. Ambos jugadores cooperarán para superar los distintos escenarios.

* Ref. Risk Of Rain: https://hopoogames.com/risk-of-rain/
* Ref. Dead Cells: https://deadcells.com/


Dinámica: Cooperación de dos jugadores en red con distintas armas, que combinadas les permitirán escapar de un templo lleno de enemigos.

Licencia: CC BY-NC-ND (Reconocimiento-NoComercial-SinObraDerivada)

Público: Joven-Adulto-Amantes del Arcade. Se trata de una trama sencilla. Es un juego que permite jugar tanto sesiones largas por su rejugabilidad como de forma esporádica. Está destinado tanto al público que consume habitualmente videojuegos como para quienes tienen un contacto más esporádico. StoryBoard:

![alt tag](/resources/img/ReadMe/Storyboard.png)


Visión general del juego: Ruins Of Light es un juego que toma referencias de las leyendas que mencionan que una antigua civilización dejó templos repartidos por toda la tierra: la Atlántida, las pirámides egipcias, las piedras de Stonehenge… Propósito: Ruins Of Light busca la cooperación en red entre dos jugadores, proporcionándoles retos tales como explorar los más profundos rincones de una pirámide maya en la que existen unos tesoros o reliquias que despertarán los más fieros guardianes de una antiquísima civilización nunca antes conocida. Los dos jugadores deberán luchar codo con codo enfrentándose a infinidad de enemigos, incluidos los guardianes, si quieren poder escapar de este templo que los protagonistas hallaron tras años de investigaciones. Las mecánicas de los enemigos y escenarios están diseñadas precisamente para lograr ese objetivo.


2.-JUGABILIDAD El jugador podrá moverse en un plano 2D a través de distintos escenarios, con un avance lineal pasando por cada uno de los jefes. El sistema de derrota de este juego, se produce si alguno de los dos jugadores, pierde todas sus vidas (7), el juego muestra una pantalla de “Game Over”, y de nuevo habrá que comenzar una nueva partida desde el menú principal. Cámara: 2D siguiendo lateralmente y verticalmente a los protagonistas. Controles: Teclado y ratón. Ratón: Click izquierdo: Ataque. Click derecho: Interacción. Teclado: A: Desplazarse hacia la izquierda. D: Desplazarse hacia la derecha. W / SpaceBar: Saltar. Esc: Menú. Puntuación: No se dispone de un contador de misiones, pero existen tantas estatuas como bosses, y para poder escapar del templo se deben derrotar a todos ellos. El jugador será consciente de esta situación mediante una pequeña introducción , y los jefes son estatuas visibles en todo momento en el Gran Salón. Guardar/Cargar: No se dispone de sistema de guardado. Flujo de pantallas: Los jugadores comienzan en la pantalla del menú principal, compuesta por el título del juego y el botón de inicio. Cuando se pulsa el botón de inicio, se muestran una secuencia de imágenes que sitúan al jugador en el contexto del juego. A continuación aparecen los dos jugadores en una sala del templo donde cada uno elige su arma. Acto seguido los jugadores tendrán libertad para explorar el templo y completar así las misiones en las que se generarán combinaciones aleatorias de enemigos, regresando al Gran Salón para enfrentarse a los jefes tras cada misión. 
Diagrama de Flujo: 

![alt tag](/resources/img/ReadMe/Diagrama.png) 


Escenas:

![alt tag](/resources/img/ReadMe/LogIn.png)
![alt tag](/resources/img/ReadMe/ErrorConex.png)
![alt tag](/resources/img/ReadMe/Menu.png)
![alt tag](/resources/img/ReadMe/LeaderBoard.png)
![alt tag](/resources/img/ReadMe/Intro.png)
![alt tag](/resources/img/ReadMe/Cinematica.png)
![alt tag](/resources/img/ReadMe/SalaEspera.png)
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

Gran Guardián Loro: Descripción: Enemigo principal. Es un líder de la antigua civilización. Tiene una vida superior al resto de enemigos. Sus garras son poderosos e intenta cazar con ellas a sus enemigos. Concepto: Jefe Final. Estos enemigos son más difíciles de derrotar, una vez derrotados, te permiten seguir avanzando. Momento: Cada vez que los jugadores completan una o varias misiones, son generados siempre en el Gran Salón. Habilidades: Golpe de Garras. Armas:-. Objetos: Posee una armadura que le protege del daño. NPC: Son los enemigos principales del juego o jefes, no son jugables. 

Assets Clave:

Altares: Pedestales o soportes donde reposan ambas armas. 

![alt tag](/resources/img/ReadMe/AltarEspada.png)
![alt tag](/resources/img/ReadMe/AltarArco.png)


Espada: Arma que permite atacar a los enemigos terrestres. Su portador podrá elegir la dirección del ataque. Arco: Arma que permite atacar a los enemigos a distancia. Su portador podrá elegir la dirección del ataque. 

Spawner: Lugar en el que se generan aleatoriamente todo tipo de enemigos. Se reconocen por ser un bloque con el logo de un calavera negra.


3.-INTERFAZ Esta sección abarca los elementos visibles que componen la pantalla de juego. Inicialmente se mostrarán los bocetos y el equipo de diseño se encargará de su actualización dentro del presente documento. También se describen los conceptos relacionados con la apariencia del juego, paleta de colores, ambientación...

Nombre de la pantalla: Menú principal. Descripción de la pantalla: Muestra un fondo con el templo maya donde transcurre el juego, visto desde el exterior. En la imagen en su parte superior se puede leer el título del juego “Ruins of Light”  y en el centro,escorado a la izquierda, aparecen las opciones de Nuevo Juego y Créditos. 

Nombre de la pantalla: Intro. Descripción de la pantalla: Se trata de una sucesión de imágenes que sirven de explicación breve de la narrativa del juego para los jugadores que jueguen por primera vez, siendo posible saltársela en futuras partidas por los jugadores que ya conocen dicha historia. Finaliza con una pequeña cinemática explicando el objetivo principal del juego, justo antes de comenzar la aventura.

Nombre de la pantalla: Créditos. Descripción de la pantalla: Aparece una pantalla con los nombres de todos los desarrolladores del juego. 

Nombre de la pantalla: Game Over. Descripción de la pantalla: Aparece una pantalla con dos cadáveres de serpientes entrelazadas con la palabra Game Over. Ambas serpientes hacen referencia a las serpientes que representan la barra de vida de los jugadores. 


4.-ARTE Colores: Paleta de colores: 

![alt tag](/resources/img/ReadMe/Paleta.jpg)


Saturación: La saturación será media, con colores llamativos pero no estridentes.

Música: Altares: Música pausada y relajada constante. Gran Salón: Música relajada y pausada hasta que ocurra un enfrentamiento, entonces la música se acelera. Resto de zonas: Música pausada hasta enfrentamiento. 
Efectos*: Ataque Espada, Ataque enemigos, Despertar y Muerte de guardianes jefes, Ataque Arco, Puertas…

*Efectos: algunos efectos como los del gorila han tenido que ser descargados y adaptados para el juego. Concretamente la referencia es:http://recursostic.educacion.es/bancoimagenes/web/
 
Arte conceptual: Guía de estilo: El estilo artístico empleado para los personajes y los escenarios es el pixel art. Los distintos personajes tendrán animaciones de movimiento, ataque, salto, etc. Los escenarios toman inspiración de antiguas civilizaciones. La arquitectura se caracteriza por emplear piedra con detalles de luz emisiva que representa la energía que recorre el templo y a sus guardianes. Galería de imágenes: Véanse imágenes en la carpeta de recursos del siguiente enlace.
https://github.com/damacaa/RuinsOfLight/tree/main/resources
 

5.-API REST:
5.1.-Diagrama de clases y API REST: En el lado del servidor encontramos un diagrama de clases basado en la arquitectura software MVC (Modelo Vista Controlador), tal como el que se muestra en la siguiente imagen.
![alt tag](/resources/img/ReadMe/MVC.png)


5.2.- Instrucciones precisas para ejecutar la aplicación: compilación, cómo ejecutar el .jar, qué hace falta instalar en la máquina, qué URL cargar en el navegador para empezar a jugar, etc.

¿Qué hace falta instalar? 
Hay que tener instalado Java. Se ha desarrollado en la versión 1.8 y no se puede garantizar que funcione en versiones anteriores. De cara a futuras versiones podría suceder algo similar.
Hay que tener instalado un navegador web. El equipo de desarrollo recomienda utilizar Google Chrome.

Para compilar: Importar el proyecto en el STS, y ejecutarlo como “Maven build”. Esto generará un archivo .jar en la carpeta target.

Para ejecutar el .jar: Se puede ejecutar haciendo doble click, pero no es recomendable. Para ejecutar se debe abrir una consola de comandos y escribir “java -jar rutaArchivo/nombreArchivo.jar”. No obstante, en la carpeta RuinsOfLight encontrarás el archivo .jar ya compilado así como un un archivo .bat de nombre runRolServer.bat, el cual permite arrancar el .jar y visualizar la consola al mismo tiempo sin tener que abrir la línea de comandos. Con el servidor abierto solo queda escribir “localhost:8080” en el navegador.


5.3.- Métodos empleados para hacer peticiones al servidor 
//PlayerController
@GetMapping("players/")
public List<Player> players(): devuelve la lista de jugadores que están online.

@PostMapping("join/")
public boolean unirsePartida(@RequestBody Player p): recibe un jugador y comprueba que en la lista de jugadores del servidor no haya un jugador con el mismo nombre. Si no lo hay, se añade a la lista de jugadores.

@PostMapping("check/")
public boolean comprobarJugador(@RequestBody Player p): este método recibe un jugador y comprueba si está en la lista de jugadores del servidor y actualiza última hora de conexión con la hora actua.

@Scheduled(fixedDelay = 500)
public void CheckPayers(): compara la última hora de conexión de cada uno de los jugadores con la hora actual. Si la diferencia entre estas es mayor a x segundos, el jugador en cuestión es borrado de la lista de jugadores.

//RecordController
@GetMapping("records/")
public List<Record> records(): devuelve los récords almacenados en el servidor.

@PostMapping("records/")
public Record nuevoRecord(@RequestBody Record record): guarda en la lista de récords el récord que recibe y lo escribe en un fichero .txt, para que los récords tengan persistencia.

//ChatController
@GetMapping("chats/")
public List<Chat> chats(): devuelve todos los mensajes en el servidor.

@PostMapping("chats/")
public boolean nuevoChat(@RequestBody Chat chat): guarda en la lista de chats el mensaje que recibe.

@Scheduled(fixedDelay = 1000)
public void CheckPayers(): compara la hora de creación de cada uno de los mensaje con la hora actual. Si la diferencia entre estas es mayor a x segundos, el mensaje en cuestión es borrado de la lista de mensajes.


6.- WEBSOCKETS:
6.1.-Documentación protocolo
En la carpeta del proyecto se añade el archivo WebSocket.js, el cual se encargará de implementar las funcionalidades del cliente. En dicho archivo se encuentra la creación y administración de una conexión a un servidor a través de un WebSocket, el envío de mensajes y la gestión de los mensajes recibidos.

En la parte del servidor, se implementa un manejador que gestiona los mensajes. Concretamente se ha implementado una clase WebSocketPlayerHandler que gestiona los mensajes recibidos y los envía a los clientes que corresponda. Cabe destacar que los mensajes enviados son strings en formato JSON. En ambos extremos de la comunicación este string se interpreta como un objeto para su posterior lectura.

La clase WebSocketPlayerHandler contiene una lista de objetos de la clase WSPlayer, que almacenan la sesión correspondiente así como información extra como el nombre del jugador o la fecha y hora de la última actualización.

Se gestiona la asincronía de los mensajes comparando en el servidor la fecha y hora de cada mensaje recibido con la fecha más reciente de la que se tenga constancia. Para ello, se envía la fecha desde el cliente como parte del mensaje.

Se ha implementado la gestión de la concurrencia de una forma muy simple. Al establecer una nueva conexión se crea un nuevo jugador. Cuando este jugador empieza a buscar partida, se mira si hay algún otro jugador en la lista de espera. Si no hay nadie se añade el jugador a la lista de espera, pero si sí que hay alguien, se les asigna un identificador de la sala a la que pertenecen, se les envía un mensaje para confirmar que se han unido satisfactoriamente a una sala y empiezan a intercambiar mensajes. Cuando una de las dos sesiones se cierra, se envía un mensaje al otro jugador haciendo que este se salga de la partida.


6.2.-Diagrama de clases WS
![alt tag](/resources/img/ReadMe/MVC_ws.png)


7.- MEJORAS FINALES:
En esta última fase se detallan todos los cambios, modificaciones, mejoras y soluciones que se han implementado de forma paralela al desarrollo de las anteriores prácticas: 

Shader GLSL: Se implementa un shader personalizado con dos objetivos. En primer lugar, se oscurecen los bordes de las pantallas jugables para mejorar la atmósfera del juego. En segundo lugar, se difuminan aquellos píxeles con brillo superior a un umbral. De ese modo, da la sensación de que los colores más brillantes desprenden luz.

Partículas: Utilizando la clase rectángulo de Phaser, se instancia un número de veces correspondiente al área total de la escena en la que se encuentran los jugadores. Estos rectángulos interpolan su posición entre la inicial y una nueva, así como un valor alpha de transparencia, repitiendo este proceso generando un sistema de partículas que se asemejan a las partículas de polvo en suspensión. 

Nuevos assets: Incorporación de nuevos assets, animaciones, tales como nuevos altares, nuevos ataques de los enemigos, nuevos efectos de sonido, un perro guía…

Escena interfaz: Se ha creado una nueva escena que corre de forma simultánea a las escenas del juego y los menús. De este modo, se separan los elementos que aparecen en pantalla en una capa superior con toda la información del juego como puede ser la vida de los jugadores y otra capa en la parte inferior con los datos referidos a la parte de api rest, intercambio de información, lista de jugadores online...

Spawner: Respecto a la anterior fase, no solo se ha añadido un asset que los identifica en forma de calavera, sino que ahora gestionan mucho mejor la generación de enemigos. Concretamente, ahora se contabiliza el tiempo que pasa entre un spawn y otro. Cuando se supera el determinado tiempo de espera, de manera aleatoria se elige el tipo de enemigo que va a ser generado. Además se tienen en cuenta para la gestión, el número de enemigos que ya están en juego, para no sobrecargar la escena de enemigos y hacer muy difícil el progreso. 

Perro con IA: Se ha implementado un perro que guía a los jugadores hasta las reliquias mediante un algoritmo de A*.

Pociones: Si tienes toda la vida, no puedes coger más pociones curativas.

Control con mando: Se puede controlar al personaje con mando de PlayStation 4. https://labs.phaser.io/edit.html?src=src/input/gamepad/gamepad%20debug.js

Controles para móvil: Se puede controlar al personaje en la pantalla del móvil con otros botones, al igual que para poner el juego en pantalla completa. https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
![alt tag](/resources/img/ReadMe/MobileControls.png)

Límite de 64 jugadores: Se ha establecido un límite artificial al número de jugadores que se pueden conectar para que no se sature el servidor.

Ampliación del primer nivel: Se ha remodelado su diseño y se ha ampliado para que la duración media del juego sea un poco superior.

Escena de error de conexión: En el caso de no conseguir entablar conexión, aparece una nueva pantalla después de introducir el nombre de usuario, en la que el jugador puede elegir jugar offline o volver a intentar establecer conexión.

Sala de espera: Antes de empezar a jugar, tras la introducción, se entra a la sala de espera en la que permaneces hasta que se une otro jugador online. Una vez los dos dentro de la sala, comienza el juego.

Organización de código: Se ha organizado el código, carpetas y archivos, al igual que se han creado otros distintos.
