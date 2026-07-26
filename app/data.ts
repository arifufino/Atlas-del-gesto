export type Signal = {
  title: string;
  channel: "Mirada" | "Rostro" | "Postura" | "Manos" | "Movimiento" | "Voz" | "Distancia" | "Objeto";
  observation: string;
  function: string;
  context: string;
};

export type CharacterProfile = {
  id: string;
  name: string;
  role: string;
  seasons: number[];
  archetype: string;
  palette: string;
  signature: string;
  evolution: string;
  signals: Signal[];
};

export const profiles: CharacterProfile[] = [
  {
    id: "thomas-shelby",
    name: "Thomas Shelby",
    role: "Estratega y jefe de familia",
    seasons: [1, 2, 3, 4, 5, 6],
    archetype: "Control",
    palette: "#a6b6c2",
    signature: "Quietud calculada",
    evolution:
      "Parte de una contención militarizada y cada ascenso social vuelve su presencia más económica. Tras las pérdidas, esa inmovilidad se fisura: aparecen ausencias, respiración pesada, mirada desenfocada y episodios de desorganización.",
    signals: [
      {
        title: "Mirada de cálculo",
        channel: "Mirada",
        observation:
          "Sostiene el contacto visual sin acompañarlo con asentimientos; alterna ese foco con barridos breves del entorno.",
        function:
          "Obliga al otro a llenar el silencio y comunica que está procesando más información de la que revela.",
        context:
          "Negociaciones, interrogatorios y entradas en territorio hostil.",
      },
      {
        title: "Rostro de mínima fuga",
        channel: "Rostro",
        observation:
          "Mandíbula contenida, labios apenas separados y expresión casi neutra; la emoción suele concentrarse en párpados y respiración.",
        function:
          "Reduce las pistas disponibles y hace que una mínima contracción tenga más peso dramático.",
        context:
          "Cuando recibe amenazas, malas noticias o debe ocultar afecto.",
      },
      {
        title: "Marcha de amplitud",
        channel: "Movimiento",
        observation:
          "Camina erguido, con zancada regular y brazos ligeramente separados del torso.",
        function:
          "Amplía visualmente una complexión delgada y convierte la llegada en una toma de territorio.",
        context:
          "Entradas públicas y desplazamientos del grupo.",
      },
      {
        title: "El cigarrillo como metrónomo",
        channel: "Objeto",
        observation:
          "Enciende, sostiene o exhala en pausas decisivas; rara vez el gesto parece apresurado.",
        function:
          "Administra el tempo de la conversación, crea una barrera y ofrece una salida física a la tensión.",
        context:
          "Antes de responder, al ocultar inquietud o al cerrar una decisión.",
      },
      {
        title: "Voz baja, pausa larga",
        channel: "Voz",
        observation:
          "Registro grave, volumen contenido y frases separadas por silencios deliberados.",
        function:
          "Hace que los demás se inclinen o callen; la falta de volumen sustituye al esfuerzo visible.",
        context:
          "Órdenes, acuerdos y amenazas sin exhibición emocional.",
      },
      {
        title: "La grieta traumática",
        channel: "Postura",
        observation:
          "En privado, la espalda pierde eje, la mirada se aleja del presente y la respiración rompe su ritmo habitual.",
        function:
          "Contrasta la máscara de mando con hipervigilancia, duelo y agotamiento acumulado.",
        context:
          "Recuerdos de guerra, duelo, insomnio y temporadas finales.",
      },
    ],
  },
  {
    id: "arthur-shelby",
    name: "Arthur Shelby",
    role: "Brazo ejecutor y hermano mayor",
    seasons: [1, 2, 3, 4, 5, 6],
    archetype: "Volatilidad",
    palette: "#c59b72",
    signature: "Energía sin contención",
    evolution:
      "Su cuerpo oscila entre expansión agresiva y derrumbe. La religión, la pareja y la sobriedad intentan ordenar el gesto, pero la culpa y las sustancias vuelven más abruptos sus cambios.",
    signals: [
      {
        title: "Pecho en avanzada",
        channel: "Postura",
        observation:
          "Proyecta el esternón, abre los codos y adelanta la cabeza como si el cuerpo llegara antes que la frase.",
        function:
          "Convierte la cercanía en presión física y anuncia una respuesta impulsiva.",
        context:
          "Discusiones de jerarquía, amenazas y protección familiar.",
      },
      {
        title: "Ritmo de explosión",
        channel: "Movimiento",
        observation:
          "Pasa de la inmovilidad tensa a movimientos grandes y rápidos, con poca transición.",
        function:
          "Hace impredecible la escalada y exterioriza una regulación emocional frágil.",
        context:
          "Violencia, consumo, celos y crisis de culpa.",
      },
      {
        title: "Manos que descargan",
        channel: "Manos",
        observation:
          "Aprieta puños, golpea superficies, señala con todo el brazo o se aferra a otra persona.",
        function:
          "La emoción desborda el discurso y busca una salida muscular.",
        context:
          "Ira, celebración excesiva, arrepentimiento y súplica.",
      },
      {
        title: "Rostro en combate",
        channel: "Rostro",
        observation:
          "Cejas tensas, dientes expuestos y ojos muy abiertos; después, párpados caídos y facciones hundidas.",
        function:
          "Muestra el ciclo amenaza–descarga–vergüenza con muy poca máscara.",
        context:
          "Antes y después de una agresión o una recaída.",
      },
      {
        title: "Voz quebrada",
        channel: "Voz",
        observation:
          "Alterna grito áspero, risa abrupta, susurro confesional y respiración audible.",
        function:
          "Revela que su autoridad depende más de la intensidad que del control.",
        context:
          "Órdenes, sermones, confesiones y episodios de abstinencia.",
      },
    ],
  },
  {
    id: "polly-gray",
    name: "Polly Gray",
    role: "Matriarca y tesorera",
    seasons: [1, 2, 3, 4, 5],
    archetype: "Autoridad",
    palette: "#9e7f8e",
    signature: "Juicio sin prisa",
    evolution:
      "Su verticalidad doméstica se vuelve cada vez más ceremonial. El reencuentro con su hijo, la prisión y el duelo introducen temblor, impulsividad y vulnerabilidad, sin borrar su dominio del espacio.",
    signals: [
      {
        title: "Mentón de matriarca",
        channel: "Postura",
        observation:
          "Cabeza alta, hombros asentados y torso frontal incluso cuando permanece sentada.",
        function:
          "Establece rango sin imitar la agresividad física de los hombres.",
        context:
          "Consejos familiares, negocios y confrontaciones.",
      },
      {
        title: "Mirada lateral de evaluación",
        channel: "Mirada",
        observation:
          "Observa desde el rabillo del ojo antes de girar por completo; sostiene el silencio con una ceja apenas elevada.",
        function:
          "Comunica escepticismo y obliga al interlocutor a justificar su versión.",
        context:
          "Mentiras familiares, propuestas dudosas y lectura de desconocidos.",
      },
      {
        title: "Economía de manos",
        channel: "Manos",
        observation:
          "Usa gestos compactos: coloca un vaso, enciende un cigarrillo o señala una vez y vuelve al reposo.",
        function:
          "Da a cada acción el valor de una sentencia y evita competir por volumen.",
        context:
          "Decisiones financieras y límites familiares.",
      },
      {
        title: "Contacto de doble filo",
        channel: "Distancia",
        observation:
          "Acaricia, abraza o arregla la ropa de los suyos; puede convertir esa misma cercanía en advertencia.",
        function:
          "Fusiona cuidado y autoridad: el vínculo afectivo también define obediencia.",
        context:
          "Con hijos, sobrinos y parejas que entran en la familia.",
      },
      {
        title: "Elegancia como armadura",
        channel: "Objeto",
        observation:
          "Sombreros, joyas, cigarrillo y prendas estructuradas acompañan una presencia cada vez más pública.",
        function:
          "La apariencia amplía su estatus y sostiene el personaje incluso durante el duelo.",
        context:
          "Ascenso económico, fiestas, reuniones y temporadas medias.",
      },
    ],
  },
  {
    id: "ada-shelby",
    name: "Ada Shelby",
    role: "Mediadora política y familiar",
    seasons: [1, 2, 3, 4, 5, 6],
    archetype: "Independencia",
    palette: "#af9f78",
    signature: "Distancia crítica",
    evolution:
      "Comienza apartándose físicamente del negocio familiar. Con los años regresa sin someterse: su postura se endereza, sus gestos se reducen y en la última temporada ocupa parte del espacio simbólico de la matriarca.",
    signals: [
      {
        title: "Ceja de desacuerdo",
        channel: "Rostro",
        observation:
          "Eleva una ceja, inclina apenas la cabeza y deja una pausa antes de contestar.",
        function:
          "Marca autonomía intelectual sin entrar de inmediato en la pelea.",
        context:
          "Debates políticos y decisiones de sus hermanos.",
      },
      {
        title: "Cuerpo que se retira",
        channel: "Distancia",
        observation:
          "Se gira, cruza la habitación o mantiene un margen físico cuando rechaza el código familiar.",
        function:
          "Convierte la distancia en frontera moral y no solo espacial.",
        context:
          "Primeras temporadas y discusiones sobre violencia.",
      },
      {
        title: "Verticalidad heredada",
        channel: "Postura",
        observation:
          "En etapas posteriores se sienta erguida, sostiene el mentón y ocupa el centro sin agitación.",
        function:
          "Señala la transición de observadora crítica a figura de autoridad.",
        context:
          "Reuniones empresariales y temporada final.",
      },
      {
        title: "Palabra sin ornamento",
        channel: "Voz",
        observation:
          "Entrega frases con claridad, ironía seca y poco relleno gestual.",
        function:
          "Su precisión verbal neutraliza grandilocuencia y bravata.",
        context:
          "Negociación, mediación y confrontación social.",
      },
    ],
  },
  {
    id: "john-shelby",
    name: "John Shelby",
    role: "Ejecutor y socio familiar",
    seasons: [1, 2, 3, 4],
    archetype: "Bravata",
    palette: "#b08b70",
    signature: "Confianza juvenil",
    evolution:
      "Mantiene una expansión despreocupada incluso cuando aumenta el riesgo. Su rapidez para sonreír, acercarse o responder hace visible la diferencia entre valentía y cálculo.",
    signals: [
      {
        title: "Sonrisa de desafío",
        channel: "Rostro",
        observation:
          "Sonríe o deja asomar los dientes durante una provocación.",
        function:
          "Trata el peligro como juego y refuerza la identidad grupal.",
        context:
          "Bromas, amenazas y confrontaciones con rivales.",
      },
      {
        title: "Base abierta",
        channel: "Postura",
        observation:
          "Piernas separadas, hombros sueltos y manos lejos del centro del cuerpo.",
        function:
          "Proyecta disponibilidad para actuar, aunque expone exceso de confianza.",
        context:
          "Reuniones del grupo y discusiones rápidas.",
      },
      {
        title: "Respuesta instantánea",
        channel: "Movimiento",
        observation:
          "Se levanta, gira o avanza antes de terminar de evaluar la situación.",
        function:
          "Comunica lealtad e impulsividad a la vez.",
        context:
          "Defensa de la familia y escaladas de conflicto.",
      },
      {
        title: "Complicidad táctil",
        channel: "Distancia",
        observation:
          "Golpea hombros, se acerca a sus hermanos y comparte el espacio sin ceremonia.",
        function:
          "Refuerza camaradería y pertenencia.",
        context:
          "Celebraciones, planes y desplazamientos del grupo.",
      },
    ],
  },
  {
    id: "michael-gray",
    name: "Michael Gray",
    role: "Heredero, contador y rival",
    seasons: [2, 3, 4, 5, 6],
    archetype: "Ambición",
    palette: "#71868f",
    signature: "Calma aprendida",
    evolution:
      "Pasa de una curiosidad abierta a copiar la quietud del jefe. El traje, la mirada más larga y el torso rígido construyen autoridad; cuando lo desafían, la tensión en mandíbula y cuello delata que el control todavía es adquirido.",
    signals: [
      {
        title: "Imitación del poder",
        channel: "Postura",
        observation:
          "Adopta espalda recta, manos quietas y silencios similares a los del líder.",
        function:
          "Ensaya pertenencia y sucesión, pero la semejanza también expone rivalidad.",
        context:
          "Desde su integración en la empresa hasta el conflicto final.",
      },
      {
        title: "Mandíbula de resistencia",
        channel: "Rostro",
        observation:
          "Aprieta la mandíbula y eleva apenas el mentón cuando una orden lo reduce.",
        function:
          "Contiene el desacuerdo mientras preserva una fachada ejecutiva.",
        context:
          "Reprimendas, votaciones familiares y negociaciones.",
      },
      {
        title: "Mirada de sucesión",
        channel: "Mirada",
        observation:
          "Mantiene contacto visual más allá del momento socialmente cómodo y tarda en bajar la vista.",
        function:
          "Reclama igualdad de rango sin recurrir a la violencia inmediata.",
        context:
          "Conflictos de liderazgo en las temporadas finales.",
      },
      {
        title: "Inmovilidad frágil",
        channel: "Manos",
        observation:
          "Mantiene manos enlazadas o apoyadas, pero aparecen pequeños reajustes bajo presión.",
        function:
          "La disciplina visible funciona como máscara de ansiedad y cálculo.",
        context:
          "Interrogatorios, pérdidas financieras y espera.",
      },
    ],
  },
  {
    id: "finn-shelby",
    name: "Finn Shelby",
    role: "Hermano menor en formación",
    seasons: [1, 2, 3, 4, 5, 6],
    archetype: "Imitación",
    palette: "#879178",
    signature: "Autoridad prestada",
    evolution:
      "Su lenguaje cambia de observador juvenil a una copia más vistosa del grupo: pecho abierto, consumo exhibido y gestos de mando. La mirada vacilante y la reacción tardía muestran que el rango no está plenamente incorporado.",
    signals: [
      {
        title: "Mirada de referencia",
        channel: "Mirada",
        observation:
          "Busca el rostro de un hermano antes de decidir cómo reaccionar.",
        function:
          "Expone aprendizaje social y dependencia de la jerarquía.",
        context:
          "Primeras reuniones y situaciones ambiguas.",
      },
      {
        title: "Pecho prestado",
        channel: "Postura",
        observation:
          "Ensacha la postura al asumir responsabilidades, con una rigidez mayor que la de sus modelos.",
        function:
          "Intenta hacer visible una autoridad que todavía necesita confirmación externa.",
        context:
          "Negocio de apuestas y temporadas posteriores.",
      },
      {
        title: "Demora bajo presión",
        channel: "Movimiento",
        observation:
          "Se queda quieto un instante, mira alrededor y actúa después que los demás.",
        function:
          "Señala conflicto entre pertenencia, miedo y criterio propio.",
        context:
          "Violencia, pruebas de lealtad y exclusión.",
      },
      {
        title: "Exceso performativo",
        channel: "Objeto",
        observation:
          "Cigarrillo, bebida o arma aparecen como accesorios de adultez y estatus.",
        function:
          "La utilería comunica identidad grupal antes que competencia real.",
        context:
          "Adolescencia tardía y vida nocturna.",
      },
    ],
  },
  {
    id: "grace-burgess",
    name: "Grace Burgess",
    role: "Agente encubierta y vínculo íntimo",
    seasons: [1, 2, 3],
    archetype: "Doble lectura",
    palette: "#b9aa91",
    signature: "Escucha estratégica",
    evolution:
      "Su atención profesional se suaviza en la intimidad. El conflicto entre misión y afecto aparece en pausas, miradas que se retiran y un cuerpo que alterna cercanía con vigilancia.",
    signals: [
      {
        title: "Escucha de cobertura",
        channel: "Mirada",
        observation:
          "Mantiene atención amable mientras registra entradas, reacciones y conversaciones periféricas.",
        function:
          "Combina apariencia de disponibilidad con recolección de información.",
        context:
          "Trabajo en el bar y escenas de investigación.",
      },
      {
        title: "Sonrisa dosificada",
        channel: "Rostro",
        observation:
          "Sonríe de forma breve y controlada, con cambios pequeños alrededor de los ojos.",
        function:
          "Administra confianza sin entregar por completo su posición.",
        context:
          "Coqueteo, persuasión y encubrimiento.",
      },
      {
        title: "Cercanía interrumpida",
        channel: "Distancia",
        observation:
          "Se aproxima con naturalidad y luego crea un pequeño margen al recordar la misión o el riesgo.",
        function:
          "Hace visible el choque entre deseo, culpa y autoprotección.",
        context:
          "Relación íntima y decisiones de lealtad.",
      },
      {
        title: "Quietud operativa",
        channel: "Manos",
        observation:
          "Mantiene manos ocupadas en tareas ordinarias para escuchar sin parecer inmóvil.",
        function:
          "Camufla vigilancia dentro del trabajo cotidiano.",
        context:
          "Servicio en el bar y observación encubierta.",
      },
    ],
  },
  {
    id: "lizzie-stark",
    name: "Lizzie Stark",
    role: "Secretaria, esposa y observadora interna",
    seasons: [1, 2, 3, 4, 5, 6],
    archetype: "Resistencia",
    palette: "#9d7f72",
    signature: "Dignidad defensiva",
    evolution:
      "Pasa de la cautela social a una presencia doméstica firme. La inmovilidad que antes protegía su vulnerabilidad se transforma en límite; el duelo final rompe esa reserva en gestos más abiertos.",
    signals: [
      {
        title: "Hombros en resguardo",
        channel: "Postura",
        observation:
          "Recoge ligeramente hombros y brazos en situaciones de juicio o humillación.",
        function:
          "Reduce exposición y conserva dignidad ante una asimetría de poder.",
        context:
          "Primeras temporadas y espacios donde se cuestiona su pasado.",
      },
      {
        title: "Mirada sin concesión",
        channel: "Mirada",
        observation:
          "Sostiene la mirada con tristeza o enojo sin acompañarla de sonrisa conciliadora.",
        function:
          "Niega una falsa normalidad y exige reconocimiento emocional.",
        context:
          "Conflictos de pareja, pérdida y abandono.",
      },
      {
        title: "Distancia protectora",
        channel: "Distancia",
        observation:
          "Coloca el cuerpo entre los niños y el conflicto o abandona la habitación cuando el límite se rompe.",
        function:
          "La ubicación física se convierte en cuidado y decisión moral.",
        context:
          "Vida familiar y temporadas finales.",
      },
      {
        title: "Voz que deja de pedir",
        channel: "Voz",
        observation:
          "Su habla evoluciona de la negociación cauta a frases firmes y definitivas.",
        function:
          "Marca el paso de buscar aceptación a establecer condiciones.",
        context:
          "Matrimonio, empresa y ruptura.",
      },
    ],
  },
  {
    id: "alfie-solomons",
    name: "Alfie Solomons",
    role: "Aliado y antagonista imprevisible",
    seasons: [2, 3, 4, 5, 6],
    archetype: "Imprevisibilidad",
    palette: "#9b8c73",
    signature: "Caos teatral",
    evolution:
      "Su presencia se vuelve más física y deteriorada, pero conserva el dominio del ritmo. La enfermedad, las cicatrices y la pérdida de visión añaden lentitud sin reducir su capacidad de invadir la conversación.",
    signals: [
      {
        title: "Inclinación invasiva",
        channel: "Distancia",
        observation:
          "Se inclina sobre la mesa, acerca el rostro o obliga al otro a recibir su discurso a corta distancia.",
        function:
          "Desordena el espacio personal y convierte una conversación en examen.",
        context:
          "Negociaciones y pruebas de lealtad.",
      },
      {
        title: "Cabeza en ángulo",
        channel: "Postura",
        observation:
          "Inclina cabeza y torso de forma asimétrica, como si escuchara desde una posición propia.",
        function:
          "Evita una silueta predecible y sugiere evaluación permanente.",
        context:
          "Antes de una pregunta, una broma o un cambio de tono.",
      },
      {
        title: "Manos narradoras",
        channel: "Manos",
        observation:
          "Modela ideas con dedos, palmas y objetos; gesticula como si el argumento fuera una pieza material.",
        function:
          "Ocupa la atención mientras desplaza el sentido de la conversación.",
        context:
          "Monólogos, parábolas y contratos.",
      },
      {
        title: "Volumen elástico",
        channel: "Voz",
        observation:
          "Murmura, arrastra palabras, acelera y estalla sin respetar un patrón estable.",
        function:
          "Impide anticipar si llega humor, amenaza o acuerdo.",
        context:
          "Casi todas sus negociaciones.",
      },
      {
        title: "Entrecerrar para leer",
        channel: "Mirada",
        observation:
          "Entrecierra los ojos, fija uno de ellos y compensa con orientación de cabeza.",
        function:
          "Mezcla sospecha, limitación física y concentración intimidante.",
        context:
          "Encuentros tardíos y lectura de reacciones.",
      },
    ],
  },
  {
    id: "chester-campbell",
    name: "Chester Campbell",
    role: "Inspector y perseguidor",
    seasons: [1, 2],
    archetype: "Rigidez",
    palette: "#6f7c73",
    signature: "Moral endurecida",
    evolution:
      "La postura institucional se contamina con obsesión. El cuerpo inicialmente recto se vuelve más tenso, invasivo y desigual; el bastón termina funcionando tanto como apoyo físico como emblema de poder.",
    signals: [
      {
        title: "Columna de reglamento",
        channel: "Postura",
        observation:
          "Espalda rígida, hombros fijados y cabeza alineada con poca soltura.",
        function:
          "Presenta la autoridad como disciplina moral e institucional.",
        context:
          "Llegadas oficiales, discursos y órdenes policiales.",
      },
      {
        title: "Bastón de puntuación",
        channel: "Objeto",
        observation:
          "Apoya, desplaza o marca el suelo con el bastón durante la interacción.",
        function:
          "Extiende su presencia y convierte la limitación física en signo jerárquico.",
        context:
          "Desplazamientos y confrontaciones de la segunda temporada.",
      },
      {
        title: "Proximidad de interrogatorio",
        channel: "Distancia",
        observation:
          "Reduce el margen con la persona interrogada y mantiene el torso frontal.",
        function:
          "Sustituye cooperación por presión y vigilancia.",
        context:
          "Interrogatorios, coerción y obsesión personal.",
      },
      {
        title: "Boca comprimida",
        channel: "Rostro",
        observation:
          "Aprieta labios y mandíbula antes de que la voz aumente.",
        function:
          "Hace visible el paso de contención puritana a resentimiento.",
        context:
          "Rechazo, celos y pérdida de control.",
      },
    ],
  },
  {
    id: "luca-changretta",
    name: "Luca Changretta",
    role: "Jefe mafioso y vengador",
    seasons: [4],
    archetype: "Amenaza",
    palette: "#8b6d61",
    signature: "Lentitud ceremonial",
    evolution:
      "Su lenguaje se mantiene deliberadamente estilizado: cuanto mayor es la provocación, más despacio ocupa el espacio. Cuando el plan se quiebra, la máscara da paso a movimientos más directos.",
    signals: [
      {
        title: "Palillo de espera",
        channel: "Objeto",
        observation:
          "Mueve o sostiene un palillo en la boca mientras escucha.",
        function:
          "Introduce una actividad mínima que comunica comodidad y demora la respuesta.",
        context:
          "Presentaciones, amenazas y negociaciones.",
      },
      {
        title: "Mano de precisión",
        channel: "Manos",
        observation:
          "Eleva una mano cerca del rostro, junta dedos o apunta con movimientos lentos.",
        function:
          "Convierte la amenaza en ceremonia y mantiene el foco visual.",
        context:
          "Explicaciones de venganza y condiciones.",
      },
      {
        title: "Mentón ladeado",
        channel: "Postura",
        observation:
          "Inclina la cabeza, adelanta el mentón y observa desde un ángulo bajo.",
        function:
          "Proyecta desdén y obliga al otro a interpretar una expresión ambigua.",
        context:
          "Cara a cara con rivales.",
      },
      {
        title: "Cadencia arrastrada",
        channel: "Voz",
        observation:
          "Alarga sílabas y separa frases, reservando la aceleración para el quiebre.",
        function:
          "Hace de la paciencia una forma de superioridad.",
        context:
          "Amenaza controlada y pérdida final de ventaja.",
      },
    ],
  },
  {
    id: "oswald-mosley",
    name: "Oswald Mosley",
    role: "Político fascista",
    seasons: [5, 6],
    archetype: "Dominio público",
    palette: "#7e7890",
    signature: "Escenario permanente",
    evolution:
      "Su lenguaje apenas cambia entre salón y tribuna: simetría, mentón alto y control vocal. En privado, la sonrisa pierde calidez y la proximidad se vuelve una demostración de impunidad.",
    signals: [
      {
        title: "Simetría de tribuna",
        channel: "Postura",
        observation:
          "Eje vertical, hombros equilibrados y gestos amplios organizados alrededor del centro.",
        function:
          "Fabrica claridad, disciplina y autoridad para una audiencia.",
        context:
          "Discursos, reuniones políticas y apariciones públicas.",
      },
      {
        title: "Mentón de superioridad",
        channel: "Rostro",
        observation:
          "Eleva el mentón y mira desde arriba aun cuando la diferencia física es pequeña.",
        function:
          "Codifica jerarquía y desprecio social.",
        context:
          "Encuentros privados y provocaciones.",
      },
      {
        title: "Sonrisa sin alianza",
        channel: "Rostro",
        observation:
          "Sonríe con control mientras los ojos permanecen fijos o fríos.",
        function:
          "Ofrece cortesía formal sin reducir la amenaza.",
        context:
          "Sedución política y humillación.",
      },
      {
        title: "Voz proyectada",
        channel: "Voz",
        observation:
          "Articula con volumen, ritmo y pausas preparados para el aplauso.",
        function:
          "Trata incluso la conversación privada como una actuación de liderazgo.",
        context:
          "Tribuna, cena y negociación.",
      },
    ],
  },
  {
    id: "gina-gray",
    name: "Gina Gray",
    role: "Instigadora y enlace estadounidense",
    seasons: [5, 6],
    archetype: "Desdén",
    palette: "#b08f9b",
    signature: "Comodidad provocadora",
    evolution:
      "Entra como observadora externa y pronto usa la relajación como desafío. Su cuerpo parece menos constreñido por las reglas familiares, mientras dirige o confirma la ambición de su pareja mediante mirada y contacto.",
    signals: [
      {
        title: "Reclinación desafiante",
        channel: "Postura",
        observation:
          "Se recuesta o se sienta con soltura en espacios donde los demás mantienen formalidad.",
        function:
          "Niega deferencia y se presenta como ajena a la jerarquía local.",
        context:
          "Reuniones familiares y negociaciones.",
      },
      {
        title: "Mirada de costado",
        channel: "Mirada",
        observation:
          "Observa de lado, tarda en responder o dirige la vista a su pareja antes de intervenir.",
        function:
          "Evalúa, coordina y expresa desdén sin declararlo.",
        context:
          "Propuestas de sucesión y confrontaciones.",
      },
      {
        title: "Contacto de dirección",
        channel: "Distancia",
        observation:
          "Toca brazo, hombro o torso de Michael en momentos de decisión.",
        function:
          "El gesto íntimo funciona también como señal de alineación y empuje.",
        context:
          "Cuando él duda o debe sostener una postura.",
      },
      {
        title: "Microgestos de aburrimiento",
        channel: "Rostro",
        observation:
          "Párpados bajos, boca ladeada y pequeñas exhalaciones acompañan lo que considera predecible.",
        function:
          "Reduce simbólicamente al interlocutor y provoca reacción.",
        context:
          "Choques culturales y familiares.",
      },
    ],
  },
  {
    id: "diana-mitford",
    name: "Diana Mitford",
    role: "Socialité y operadora política",
    seasons: [6],
    archetype: "Provocación",
    palette: "#a995b4",
    signature: "Elegancia invasiva",
    evolution:
      "Su presencia combina modales impecables con violación calculada de límites. La calma no oculta el daño: lo vuelve socialmente presentable.",
    signals: [
      {
        title: "Proximidad impune",
        channel: "Distancia",
        observation:
          "Se acerca más de lo necesario y sostiene la posición aun cuando genera incomodidad.",
        function:
          "Prueba límites y comunica que no espera consecuencias.",
        context:
          "Sedución, humillación y negociación.",
      },
      {
        title: "Sonrisa de provocación",
        channel: "Rostro",
        observation:
          "Mantiene una sonrisa ligera al pronunciar comentarios hostiles o íntimos.",
        function:
          "Disfraza agresión como sofisticación y obliga a elegir entre responder o guardar formas.",
        context:
          "Cenas y encuentros privados.",
      },
      {
        title: "Quietud aristocrática",
        channel: "Postura",
        observation:
          "Movimientos pequeños, cuello largo y manos tranquilas.",
        function:
          "Separa su poder del esfuerzo visible y enfatiza pertenencia de clase.",
        context:
          "Salones, fiestas y conversaciones políticas.",
      },
      {
        title: "Mirada de apropiación",
        channel: "Mirada",
        observation:
          "Recorre a la otra persona y vuelve a los ojos sin apresurarse.",
        function:
          "Convierte observación en evaluación posesiva.",
        context:
          "Coqueteo instrumental y desafío.",
      },
    ],
  },
  {
    id: "linda-shelby",
    name: "Linda Shelby",
    role: "Esposa, reformadora y contrapoder",
    seasons: [3, 4, 5, 6],
    archetype: "Contención",
    palette: "#9aa78f",
    signature: "Límite moral",
    evolution:
      "Empieza con una compostura religiosa que intenta regular el cuerpo de Arthur. La exposición a la violencia endurece su mirada y su voz; cuando el control fracasa, aparecen rigidez, retroceso y acción abrupta.",
    signals: [
      {
        title: "Manos reunidas",
        channel: "Manos",
        observation:
          "Junta manos en el regazo o a la altura del torso mientras escucha.",
        function:
          "Comunica autocontrol, reserva y una moral organizada.",
        context:
          "Consejo, oración y reuniones familiares.",
      },
      {
        title: "Espalda normativa",
        channel: "Postura",
        observation:
          "Se mantiene recta y compuesta frente a la agitación de su pareja.",
        function:
          "Ofrece un modelo corporal opuesto al caos.",
        context:
          "Intentos de sobriedad y vida doméstica.",
      },
      {
        title: "Retroceso de alarma",
        channel: "Movimiento",
        observation:
          "Retrae torso o da un paso atrás cuando la violencia invade el espacio.",
        function:
          "Marca miedo y rechazo antes de convertirlos en decisión.",
        context:
          "Recaídas, amenazas y ruptura.",
      },
      {
        title: "Mirada disciplinaria",
        channel: "Mirada",
        observation:
          "Fija la mirada y reduce el parpadeo al establecer una condición.",
        function:
          "Intenta detener la escalada mediante autoridad moral.",
        context:
          "Límites económicos, familiares y religiosos.",
      },
    ],
  },
  {
    id: "esme-shelby-lee",
    name: "Esme Shelby Lee",
    role: "Esposa, viuda y voz romaní",
    seasons: [1, 2, 3, 4, 6],
    archetype: "Franqueza",
    palette: "#aa8667",
    signature: "Presencia arraigada",
    evolution:
      "Su cuerpo rechaza la etiqueta empresarial y conserva una relación directa con territorio, familia y duelo. La pérdida vuelve su distancia más dura, pero no elimina su expresividad.",
    signals: [
      {
        title: "Base de tierra",
        channel: "Postura",
        observation:
          "Se planta con peso equilibrado, caderas firmes y torso disponible para responder.",
        function:
          "Comunica arraigo y resistencia a ser desplazada.",
        context:
          "Disputas familiares, campo y espacios romaníes.",
      },
      {
        title: "Mirada frontal",
        channel: "Mirada",
        observation:
          "Mira directamente al desafiar una orden o defender a su familia.",
        function:
          "Elimina la deferencia esperada y reclama voz propia.",
        context:
          "Matrimonio, viudez y reencuentro.",
      },
      {
        title: "Gestualidad franca",
        channel: "Manos",
        observation:
          "Señala, abre palmas o apoya manos en caderas con poca ambigüedad.",
        function:
          "Hace coincidir gesto y mensaje: desacuerdo visible, no insinuado.",
        context:
          "Discusión y negociación familiar.",
      },
      {
        title: "Cercanía protectora",
        channel: "Distancia",
        observation:
          "Acorta distancia con los suyos y la amplía con quienes percibe como amenaza.",
        function:
          "Traza físicamente el límite del grupo de pertenencia.",
        context:
          "Familia, duelo y protección.",
      },
    ],
  },
  {
    id: "tatiana-petrovna",
    name: "Tatiana Petrovna",
    role: "Aristócrata y agente imprevisible",
    seasons: [3],
    archetype: "Desorientación",
    palette: "#a47b8d",
    signature: "Ritmo quebrado",
    evolution:
      "Su lenguaje mantiene al interlocutor sin una pauta estable: juego, erotismo, dolor y cálculo pueden sucederse sin transición corporal previsible.",
    signals: [
      {
        title: "Entrada en el espacio íntimo",
        channel: "Distancia",
        observation:
          "Acorta la distancia sin pedir permiso y observa la reacción desde muy cerca.",
        function:
          "Desarma la negociación formal y transforma el cuerpo en prueba.",
        context:
          "Sedución, provocación y búsqueda de información.",
      },
      {
        title: "Cambio sin aviso",
        channel: "Movimiento",
        observation:
          "Pasa de fluidez juguetona a quietud o agresión abrupta.",
        function:
          "Impide predecir intención y mantiene ventaja psicológica.",
        context:
          "Fiestas, intimidad y conspiración.",
      },
      {
        title: "Sonrisa ambigua",
        channel: "Rostro",
        observation:
          "Sonríe en momentos donde el contexto sugiere riesgo, dolor o burla.",
        function:
          "Rompe la correspondencia esperada entre emoción y situación.",
        context:
          "Confesiones, amenazas y juego social.",
      },
      {
        title: "Contacto experimental",
        channel: "Manos",
        observation:
          "Toca objetos o personas para medir límites y reacciones.",
        function:
          "Convierte el tacto en herramienta de exploración y control.",
        context:
          "Interacciones íntimas y tratos secretos.",
      },
    ],
  },
  {
    id: "jessie-eden",
    name: "Jessie Eden",
    role: "Organizadora sindical",
    seasons: [4, 5],
    archetype: "Convicción",
    palette: "#9f765f",
    signature: "Igualdad corporal",
    evolution:
      "Mantiene una presencia compacta y directa tanto ante trabajadores como ante poderosos. La intimidad no borra su eje político ni la vuelve deferente.",
    signals: [
      {
        title: "Postura cuadrada",
        channel: "Postura",
        observation:
          "Hombros nivelados, pies firmes y torso orientado de frente.",
        function:
          "Se presenta como interlocutora equivalente, no como invitada subordinada.",
        context:
          "Huelgas, negociación y discusión política.",
      },
      {
        title: "Gesto compacto",
        channel: "Manos",
        observation:
          "Acompaña argumentos con movimientos breves y funcionales.",
        function:
          "Mantiene el foco en la idea y evita la teatralidad del poder.",
        context:
          "Discursos y negociación.",
      },
      {
        title: "Contacto visual estable",
        channel: "Mirada",
        observation:
          "Sostiene la mirada sin competir por intimidación.",
        function:
          "Comunica seguridad basada en convicción y representación colectiva.",
        context:
          "Conversaciones políticas y personales.",
      },
      {
        title: "Voz de asamblea",
        channel: "Voz",
        observation:
          "Articula con firmeza y proyección, adaptando el volumen al grupo.",
        function:
          "Convoca, ordena y mantiene una identidad pública coherente.",
        context:
          "Fábrica, calle y mesa de negociación.",
      },
    ],
  },
  {
    id: "aberama-gold",
    name: "Aberama Gold",
    role: "Cazador, aliado y padre",
    seasons: [4, 5],
    archetype: "Vigilancia",
    palette: "#7d806a",
    signature: "Amenaza en reposo",
    evolution:
      "Su quietud predatoria se humaniza alrededor de su hijo y de Polly. Después de la pérdida, el cuerpo se vuelve más frontal y menos paciente.",
    signals: [
      {
        title: "Quietud de cazador",
        channel: "Postura",
        observation:
          "Permanece asentado, con poco movimiento superfluo y peso listo para desplazarse.",
        function:
          "Comunica competencia física sin necesidad de demostración.",
        context:
          "Vigilancia, emboscada y negociación.",
      },
      {
        title: "Barrido periférico",
        channel: "Mirada",
        observation:
          "Observa rutas, alturas y personas antes de fijarse en el interlocutor.",
        function:
          "Prioriza seguridad situacional y posibles salidas.",
        context:
          "Territorio desconocido y protección.",
      },
      {
        title: "Paso medido",
        channel: "Movimiento",
        observation:
          "Avanza sin prisa, con zancada baja y dirección definida.",
        function:
          "Evita revelar urgencia y conserva equilibrio.",
        context:
          "Aproximaciones hostiles y entradas.",
      },
      {
        title: "Ablandamiento familiar",
        channel: "Rostro",
        observation:
          "La tensión ocular y mandibular disminuye cerca de su hijo o su pareja.",
        function:
          "Distingue con claridad el rol de protector del rol de cazador.",
        context:
          "Familia, afecto y duelo.",
      },
    ],
  },
  {
    id: "johnny-dogs",
    name: "Johnny Dogs",
    role: "Aliado romaní y negociador social",
    seasons: [1, 2, 3, 4, 5, 6],
    archetype: "Adaptación",
    palette: "#9a8c68",
    signature: "Elasticidad social",
    evolution:
      "Conserva ligereza corporal en entornos tensos. Su capacidad para sonreír, abrir las manos o replegarse rápido le permite circular entre jerarquías sin parecer una amenaza constante.",
    signals: [
      {
        title: "Sonrisa de descompresión",
        channel: "Rostro",
        observation:
          "Introduce una sonrisa rápida o una expresión de sorpresa para bajar la tensión.",
        function:
          "Facilita cooperación y preserva margen de maniobra.",
        context:
          "Encuentros familiares y tratos informales.",
      },
      {
        title: "Palmas visibles",
        channel: "Manos",
        observation:
          "Abre las manos al explicar, bromear o negar responsabilidad.",
        function:
          "Señala disponibilidad social y reduce amenaza.",
        context:
          "Mediación, excusas y humor.",
      },
      {
        title: "Postura elástica",
        channel: "Postura",
        observation:
          "Alterna relajación, inclinación y retirada sin fijarse en una sola forma.",
        function:
          "Se ajusta con rapidez al rango y estado emocional del grupo.",
        context:
          "Reuniones, viajes y conflictos repentinos.",
      },
      {
        title: "Alerta bajo la ligereza",
        channel: "Mirada",
        observation:
          "Mientras sonríe, los ojos siguen cambios de posición y reacciones.",
        function:
          "Combina sociabilidad con supervivencia situacional.",
        context:
          "Territorio ambiguo y planes riesgosos.",
      },
    ],
  },
  {
    id: "billy-kimber",
    name: "Billy Kimber",
    role: "Jefe de apuestas rival",
    seasons: [1],
    archetype: "Exhibición",
    palette: "#a87765",
    signature: "Estatus ostentoso",
    evolution:
      "Su cuerpo depende de la expansión y de la comitiva. Cuando la autoridad es cuestionada, el gesto se acelera y pierde la comodidad que sostenía la superioridad.",
    signals: [
      {
        title: "Torso de propiedad",
        channel: "Postura",
        observation:
          "Ocupa la silla o el paso con torso abierto y mentón elevado.",
        function:
          "Trata el espacio como extensión de su rango.",
        context:
          "Presentaciones y visitas de negocio.",
      },
      {
        title: "Gesto de séquito",
        channel: "Manos",
        observation:
          "Señala, ordena y deja que otros completen la acción.",
        function:
          "Hace visible que su poder incluye cuerpos subordinados.",
        context:
          "Órdenes y demostraciones de estatus.",
      },
      {
        title: "Inspección posesiva",
        channel: "Mirada",
        observation:
          "Recorre personas y lugares como si evaluara una adquisición.",
        function:
          "Objetualiza y establece asimetría.",
        context:
          "Negocio, deseo y rivalidad.",
      },
      {
        title: "Volumen de rango",
        channel: "Voz",
        observation:
          "Habla con volumen alto y ritmo seguro hasta que aparece una amenaza real.",
        function:
          "Usa audibilidad y certeza como sustitutos de negociación.",
        context:
          "Reunión pública y confrontación.",
      },
    ],
  },
  {
    id: "darby-sabini",
    name: "Darby Sabini",
    role: "Jefe criminal londinense",
    seasons: [2],
    archetype: "Agitación",
    palette: "#996f72",
    signature: "Presión nerviosa",
    evolution:
      "Su autoridad es móvil y reactiva: necesita tocar, acercarse, señalar y elevar el tono. La agitación lo hace peligroso, pero también más fácil de leer que un rival contenido.",
    signals: [
      {
        title: "Rostro demasiado cerca",
        channel: "Distancia",
        observation:
          "Invade el espacio facial para preguntar, corregir o amenazar.",
        function:
          "Sustituye argumento por saturación sensorial.",
        context:
          "Interrogación y disciplina interna.",
      },
      {
        title: "Señalamiento cortante",
        channel: "Manos",
        observation:
          "Usa dedos y mano completa con impulsos rápidos.",
        function:
          "Fragmenta el discurso en órdenes y acusaciones.",
        context:
          "Crisis, sospecha y mando.",
      },
      {
        title: "Desplazamiento inquieto",
        channel: "Movimiento",
        observation:
          "Camina, gira o reajusta el cuerpo mientras habla.",
        function:
          "Expone una vigilancia ansiosa y una necesidad de dominar todos los ángulos.",
        context:
          "Territorio amenazado y pérdida de control.",
      },
      {
        title: "Cadencia de descarga",
        channel: "Voz",
        observation:
          "Acelera, sube el volumen y encadena frases al alterarse.",
        function:
          "Convierte la palabra en prolongación de la agresión.",
        context:
          "Amenaza y humillación.",
      },
    ],
  },
  {
    id: "may-carleton",
    name: "May Carleton",
    role: "Entrenadora de caballos y aliada social",
    seasons: [2, 4],
    archetype: "Serenidad",
    palette: "#99a49b",
    signature: "Confianza sin dureza",
    evolution:
      "Su postura conserva la seguridad de quien domina su entorno sin adoptar la amenaza del mundo criminal. La atracción aparece en cercanía gradual, no en invasión.",
    signals: [
      {
        title: "Centro ecuestre",
        channel: "Postura",
        observation:
          "Mantiene equilibrio, hombros bajos y movimientos seguros alrededor de animales y desconocidos.",
        function:
          "Comunica competencia práctica y calma.",
        context:
          "Entrenamiento, finca y negociación.",
      },
      {
        title: "Mirada abierta",
        channel: "Mirada",
        observation:
          "Sostiene contacto visual con expresión receptiva y parpadeo natural.",
        function:
          "Ofrece atención sin convertirla en desafío.",
        context:
          "Conversación íntima y acuerdo profesional.",
      },
      {
        title: "Cercanía gradual",
        channel: "Distancia",
        observation:
          "Reduce la distancia por etapas y respeta la respuesta del otro.",
        function:
          "Construye intimidad como consentimiento mutuo.",
        context:
          "Relación afectiva y reencuentro.",
      },
      {
        title: "Manos funcionales",
        channel: "Manos",
        observation:
          "Sus gestos se ligan al trabajo, al cuidado o a una explicación concreta.",
        function:
          "Ancla su estatus en pericia, no en exhibición.",
        context:
          "Caballeriza y gestión de la finca.",
      },
    ],
  },
  {
    id: "duke-shelby",
    name: "Duke Shelby",
    role: "Hijo recién incorporado",
    seasons: [6],
    archetype: "Observación",
    palette: "#77847c",
    signature: "Silencio de aprendizaje",
    evolution:
      "En poco tiempo pasa de figura periférica a participante. Observa antes de hablar, prueba la quietud del grupo y endurece el eje corporal al recibir una identidad y una tarea.",
    signals: [
      {
        title: "Escaneo del recién llegado",
        channel: "Mirada",
        observation:
          "Recorre rostros y posiciones antes de fijar atención.",
        function:
          "Construye un mapa rápido de jerarquías y riesgos.",
        context:
          "Entrada en la familia y primeras reuniones.",
      },
      {
        title: "Quietud de prueba",
        channel: "Postura",
        observation:
          "Permanece inmóvil, con tensión contenida, cuando lo evalúan.",
        function:
          "Evita ofrecer vulnerabilidad y demuestra tolerancia a la presión.",
        context:
          "Pruebas de pertenencia y órdenes.",
      },
      {
        title: "Eje que se endurece",
        channel: "Movimiento",
        observation:
          "Endereza espalda y define la zancada conforme asume un rol.",
        function:
          "Hace visible la rápida incorporación de una identidad grupal.",
        context:
          "Tramo final de la sexta temporada.",
      },
      {
        title: "Respuesta económica",
        channel: "Voz",
        observation:
          "Habla poco y evita justificar de más.",
        function:
          "Imita el valor que la familia concede al silencio.",
        context:
          "Interrogación y aceptación de tareas.",
      },
    ],
  },
  {
    id: "isaiah-jesus",
    name: "Isaiah Jesus",
    role: "Ejecutor de nueva generación",
    seasons: [2, 3, 4, 5, 6],
    archetype: "Preparación",
    palette: "#758e91",
    signature: "Disponibilidad serena",
    evolution:
      "Pasa de compañero joven a operador confiable. Su presencia gana economía: menos exhibición, mejor lectura del entorno y movimientos directos cuando recibe una tarea.",
    signals: [
      {
        title: "Hombros disponibles",
        channel: "Postura",
        observation:
          "Mantiene hombros sueltos y peso equilibrado, sin rigidez innecesaria.",
        function:
          "Permite reaccionar rápido sin anunciar agresión constante.",
        context:
          "Guardia, acompañamiento y reuniones.",
      },
      {
        title: "Mirada de perímetro",
        channel: "Mirada",
        observation:
          "Distribuye atención entre interlocutor, accesos y compañeros.",
        function:
          "Prioriza conciencia situacional sobre teatralidad.",
        context:
          "Encargos y seguridad.",
      },
      {
        title: "Movimiento directo",
        channel: "Movimiento",
        observation:
          "Al actuar, elige trayectorias cortas y poca gesticulación.",
        function:
          "Comunica competencia aprendida y disciplina.",
        context:
          "Operaciones de las últimas temporadas.",
      },
      {
        title: "Camaradería sin sumisión",
        channel: "Distancia",
        observation:
          "Comparte espacio con la generación joven sin perder autonomía corporal.",
        function:
          "Equilibra pertenencia, amistad y función profesional.",
        context:
          "Con Finn, Duke y otros miembros del grupo.",
      },
    ],
  },
];

export const sources = [
  {
    label: "Archivo visual de personajes — Peaky Blinders Wiki",
    url: "https://peaky-blinders.fandom.com/wiki/Peaky_Blinders_Wiki",
    type: "Imágenes",
  },
  {
    label: "Guion del episodio 1, temporada 1 — BBC Writersroom",
    url: "https://downloads.bbc.co.uk/writersroom/scripts/Peaky-Blinders-S1-Ep1.pdf",
    type: "Guion",
  },
  {
    label: "Guion del episodio 1, temporada 2 — BBC Writersroom",
    url: "https://downloads.bbc.co.uk/writersroom/scripts/Peaky-Blinders-S2-Ep1.pdf",
    type: "Guion",
  },
  {
    label: "Notas de producción de la temporada 2 — BBC",
    url: "https://downloads.bbc.co.uk/mediacentre/peaky-blinders-s2.pdf",
    type: "Producción",
  },
  {
    label: "Cillian Murphy sobre la voz, la postura y la marcha — The Guardian",
    url: "https://www.theguardian.com/film/2016/apr/23/cillian-murphy-peaky-blinders-batman-scarecrow-tom-lamont",
    type: "Entrevista",
  },
  {
    label: "Helen McCrory sobre Polly Gray — BBC Media Centre (archivo)",
    url: "https://helen-mccrory.com/2013/08/23/bbc-media-centre-interview-with-helen-mccrory-2/",
    type: "Entrevista",
  },
  {
    label: "Paul Anderson sobre Arthur, vestuario y movimiento — The Chap",
    url: "https://thechap.co.uk/peaky-blinders-arthur-shelby/",
    type: "Entrevista",
  },
  {
    label: "Sophie Rundle sobre la evolución de Ada — Den of Geek",
    url: "https://www.denofgeek.com/tv/peaky-blinders-sophie-rundle-on-the-glint-in-ada-shelbys-eye/",
    type: "Entrevista",
  },
  {
    label: "Vestuario y continuidad física en la temporada 6 — Netflix Tudum",
    url: "https://www.netflix.com/tudum/articles/peaky-blinders-costumes-designer-interview",
    type: "Diseño",
  },
  {
    label: "Definición de conducta no verbal — APA Dictionary",
    url: "https://dictionary.apa.org/nonverbal-behavior",
    type: "Marco",
  },
  {
    label: "Revisión sobre poder, estatus y dominancia no verbal — PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/32361679/",
    type: "Marco",
  },
  {
    label: "Revisión sistemática sobre trauma y atención a amenazas — PMC",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6399079/",
    type: "Marco",
  },
];

export const channels = [
  "Todos",
  "Mirada",
  "Rostro",
  "Postura",
  "Manos",
  "Movimiento",
  "Voz",
  "Distancia",
  "Objeto",
] as const;
