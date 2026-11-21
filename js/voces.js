/* Generado desde el storyboard (textos de los autores). */
var VOCES = {
 "1": {
  "voz": "¡Hola! Soy Nodo, tu guía de conectividad. Muchas escuelas rurales quieren enseñar en línea, pero la señal no les alcanza. En esta ruta descubrirás cómo la arquitectura SD-WAN puede aprovechar mejor los enlaces disponibles para sostener la formación virtual. Avanza con las flechas, vuelve al mapa cuando quieras y activa el audio o la transcripción.",
  "texto": "Aulas sin cobertura: conectividad y formación virtual en comunidades rurales. Objeto Digital de Conocimiento sobre el uso de la arquitectura SD-WAN en pro de la formación virtual en la ruralidad. Paula Andrea Castro Molina – Cristián David Peña Guzmán"
 },
 "2": {
  "voz": "Antes de empezar, elige tu perfil: docente, administrador de red o gestor de proyectos, y adaptaré los consejos a tu rol. Este mapa muestra las ocho fases de la ruta. Puedes seguirlas en orden o saltar a la que necesites. Cada fase completada se enciende y, al encenderlas todas, se abre tu reto final: el plan Rural Connect.",
  "texto": "Elige tu perfil. 8 fases: Diagnosticar · Comprender · Diseñar · Simular · Optimizar · Medir · Casos · Implementar → Plan Rural Connect. Meta (REA): logro ≥ 80 %."
 },
 "3": {
  "voz": "Empecemos con una situación. En la vereda El Roble, la escuela tiene una señal 4G débil y la clase virtual se congela cada diez minutos. ¿Qué crees que ayudaría más? Elige una opción. No te preocupes si dudas: esta pregunta solo activa lo que ya sabes, y volveremos a ella al final de la ruta.",
  "texto": "Caso ficticio: la escuela de El Roble tiene un solo enlace 4G débil y la videoclase se congela cada 10 minutos. ¿Qué ayudaría más?"
 },
 "4": {
  "voz": "Empecemos por el diagnóstico. En 2024, solo cuatro de cada diez hogares rurales de Colombia tenían internet, frente a siete de cada diez en las cabeceras. El costo fue la razón más citada para no conectarse. Y en veredas del Bajo Cauca, aunque casi todos tenían celular, solo dos de cada diez hogares contaban con computador para estudiar.",
  "texto": "La brecha rural combina cobertura, costo y dispositivos: 41,9 % de hogares rurales (centros poblados y rural disperso) con internet frente a 72,5 % en cabeceras (Departamento Administrativo Nacional de Estadística [DANE], 2025). La brecha persiste (Mendoza-Lozano et al., 2021; Padilla et al., 2023)."
 },
 "5": {
  "voz": "Pongamos a prueba tu diagnóstico. Lee cada afirmación y marca verdadero o falso. Fíjate en los datos: no todo problema de acceso es de cobertura; el costo y los dispositivos también pesan. Si te equivocas, recibirás una pista y podrás intentarlo otra vez. Al completar las tres, se enciende el nodo Diagnosticar.",
  "texto": "Marca verdadero o falso en cada afirmación (DANE, 2025; Hoyos et al., 2023; Mendoza-Lozano et al., 2021)."
 },
 "6": {
  "voz": "SD-WAN significa red de área amplia definida por software. En una red tradicional, cada router se configura a mano y el tráfico sigue caminos casi fijos. SD-WAN separa la inteligencia de la red del equipo físico: un controlador central observa todos los enlaces y decide, según reglas, por cuál enviar cada tipo de tráfico. Pulsa más información para comparar.",
  "texto": "SD-WAN separa el plano de control del de datos (Hussain et al., 2023). Un controlador central gestiona varios enlaces (4G/LTE, banda ancha, satélite) y aplica políticas por aplicación (Kankipati et al., 2023; Ouamri et al., 2025)."
 },
 "7": {
  "voz": "Diseñar para el campo empieza por hacer inventario de los enlaces posibles: la red 4G, el satélite de órbita baja o incluso una red LTE privada de bajo costo. Los estudios revisados combinan al menos dos de ellos, para que uno respalde al otro. Recuerda la regla de oro: SD-WAN no crea señal; orquesta los enlaces que ya puedes conseguir.",
  "texto": "Enlaces (underlay) para zonas con infraestructura limitada: 4G/LTE, satélite LEO y LTE privado. Diseñar con al menos dos enlaces da respaldo (Afolalu y Tsoeu, 2025; Borgianni et al., 2024; Cheimaras et al., 2024). SD-WAN no crea cobertura."
 },
 "8": {
  "voz": "SD-WAN tiene cuatro piezas. En la escuela, un equipo de borde que reúne los enlaces, como una terminal de transportes que recibe rutas. En ellos, van túneles cifrados, que son caminos protegidos por donde viajan los datos. Los túneles los vigila un controlador, que decide por cuál enlace va cada información, y las políticas eligen cuál información viaja primero. Completa las cuatro parejas para encender el nodo Diseñar. Si tienes alguna duda, toca la pieza y vas a obtener una pista.",
  "texto": "Ahora, te invito a unir cada componente de SD-WAN a su función. Los componentes son: equipo de borde, túnel, controlador y política (Cheng et al., 2022; Zhang et al., 2023)."
 },
 "9": {
  "voz": "En la escuela El Roble, en un día de lluvia, el enlace 4G se cae. El rector quiere una solución que no le genere más costo. En el simulador puedes activar o desactivar enlaces y observar qué pasa con la disponibilidad, la latencia y el costo. Primero prueba solo con el 4G, luego agrega el satélite y compara. Lo importante es que consigas el equilibrio entre conexión estable y costo.",
  "texto": "Tu objetivo ahora es conseguir la configuración más equilibrada para la escuela. Puedes combinar enlaces y observar la disponibilidad, la latencia y el costo para obtenerlo (Borgianni et al., 2024; Dudczyk et al., 2025)."
 },
 "10": {
  "voz": "¡Buen trabajo! Lograste una conexión estable a un costo moderado. Ahora, ¿qué pasaría si a cierta hora todos usan la red al tiempo? Hay estudiantes que están en videoclase o realizando un examen, y algunos necesitan actualizar sus equipos. Cada tarea tiene su nivel de prioridad, que se puede controlar por políticas de SD-WAN. ¿Qué dejarías pasar primero? Ordena las prioridades y ve qué pasa.",
  "texto": "Verás varias situaciones que acomodarás de mayor prioridad, a menor prioridad. Tu objetivo es optimizar ese tráfico, teniendo en cuenta las políticas de SD-WAN (Ibrahim et al., 2025; Kankipati et al., 2023)."
 },
 "11": {
  "voz": "Bueno, ahora vas a ser el controlador. Son las diez de la mañana, en este momento hay una clase virtual, y una cantidad considerable de estudiantes están descargando guías. Se nota que el enlace 4G tambalea, pero el satelital se mantiene firme, pero está limitado. ¿Qué política configurarías? Elige y observa qué puede pasar con la clase. Puedes probar las tres sin problemas.",
  "texto": "Elige la política de tráfico y observa el efecto. +INFO «Redes que aprenden»: con aprendizaje por refuerzo (PPO), el controlador elige túneles según la telemetría (resultados simulados; Borgianni et al., 2023, 2025; Wang et al., 2025)."
 },
 "12": {
  "voz": "Para saber si la red sirve para estudiar, revisa cinco indicadores: latencia, jitter, pérdida de paquetes, disponibilidad y MOS. Toca cada nombre para ver qué mide. Luego clasifica el reporte de la escuela El Roble en verde, amarillo o rojo para una videoclase, y elige qué atenderías primero. Recuerda: lo que no se mide no se mejora.",
  "texto": "Indicadores: latencia, jitter, pérdida, disponibilidad y MOS (Cheimaras et al., 2024). Referencia: latencia en un sentido ≤ 150 ms (Unión Internacional de Telecomunicaciones [UIT-T], 2003). Clasifica el reporte y elige cuál atender primero."
 },
 "13": {
  "voz": "Aprendamos de otros. En Sudán, una red de salud adoptó SD-WAN y mantuvo su servicio clínico con altos niveles de cumplimiento. Equipos europeos probaron plataformas de bajo costo para emergencias y sitios agrícolas. Y en el Bajo Cauca se midió la inclusión digital de familias rurales. Ninguno es todavía una escuela con SD-WAN: ese caso está por construirse.",
  "texto": "Casos: salud (Ibrahim et al., 2025), emergencias (Cheimaras et al., 2024), agricultura rural (Borgianni et al., 2024) e inclusión digital rural en Colombia (Hoyos et al., 2023)."
 },
 "14": {
  "voz": "Bien, ya tienes la red armada de El Roble, pero ¿quién la mantiene, o quién les enseña a los profes a usarla? Cada caso requiere un plan que cuente con diagnósticos, alianzas, diseño, formación y medición. Casi todo lo que se sabe sobre SD-WAN rural viene de simulaciones, y no hay muchos estudios en escuelas rurales. Antes de armar tu plan, revisa el botón \"Lo que aún falta\".",
  "texto": "Verás los 5 ítems más importantes para planear, con responsables por perfil. En el botón «Lo que aún falta», vas a encontrar evidencia mayormente simulada, sobrecarga de túneles y punto único de falla (Borgianni et al., 2024; Dudczyk et al., 2025; Navarro et al., 2023)."
 },
 "15": {
  "voz": "Ya has estado trabajando en pro de la escuela El Roble. Ahora, llegó el momento de armar tu propio plan. La idea es que completes las cuatro casillas que encuentras en el lienzo. No te preocupes por atinarle, sino por explicar el porqué de tus decisiones. Te invito a revisar la rúbrica antes de enviar tus respuestas, ya que con ella se evalúa cómo justificas tu plan.",
  "texto": "Debes completar las cuatro casillas que encuentras en pantalla. Recuerda justificar cada decisión. Se te calificará con una rúbrica de 4 criterios (Anexo B)."
 },
 "16": {
  "voz": "Llegaste al reto final. Volverás a la escuela El Roble y resolverás ocho preguntas: dos para comprender conceptos, cuatro para aplicar lo aprendido al caso y dos para analizar decisiones. En tres de ellas también elegirás el porqué de tu respuesta. Junto con tu plan, necesitas al menos un ochenta por ciento. ¡Aquí te espero!",
  "texto": "Sumativa: Plan Rural Connect (50 %) + 8 ítems por niveles sobre el caso (50 %); 3 piden justificar. Logro ≥ 80 %. Banco y rúbrica en Anexos A y B."
 },
 "17": {
  "voz": "¡Red conectada! Ya sabes que la brecha rural tiene varias caras, que SD-WAN orquesta los enlaces existentes en lugar de crear cobertura, y que lo que no se mide no se mejora. ¿Recuerdas la escuela de El Roble del inicio? Compara tu primera respuesta con tu plan. Puedes repasar una fase, descargar tu plan o ir a las referencias.",
  "texto": "SD-WAN puede ser un puente hacia la educación virtual rural si se combina con los enlaces disponibles, se prioriza el tráfico educativo y se mide."
 },
 "18": {
  "voz": "Aquí están las fuentes de este recurso: los referentes conceptuales y los estudios de la revisión sistemática, con su enlace DOI. En la pestaña Créditos verás la autoría, las voces, las imágenes y la licencia Creative Commons. Gracias por recorrer esta ruta conmigo. Conectar un aula rural no es solo cuestión de señal, sino de decisiones bien pensadas.",
  "texto": "Referencias APA 7 (revisión PRISMA, DANE, UIT-T). Créditos: P. A. Castro Molina y C. D. Peña Guzmán · Universidad de Cundinamarca · nivel intermedio · CC BY-SA 4.0."
 }
};
var TITULOS = {"1": "Bienvenida formal al SCORM", "2": "Elección de ruta y perfil de usuario", "3": "Reto inicial · ¿Más gigas?", "4": "La brecha rural en cifras", "5": "Reto 1 · ¿Verdadero o falso?", "6": "Fundamentos de SD-WAN", "7": "Diseñar con poca infraestructura", "8": "Reto 2 · Piezas de la red", "9": "Simulador de arquitectura", "10": "Tráfico educativo primero", "11": "Tú eres el controlador", "12": "Reto 3 · Indicadores y semáforo", "13": "Casos de referencia", "14": "Hoja de ruta para implementar", "15": "Plan Rural Connect", "16": "Reto final - Caso El Roble", "17": "Red conectada", "18": "Referencias y créditos"};
var REFERENCIAS = [
 "Afolalu, O., y Tsoeu, M. S. (2025). Enterprise networking optimization: A review of challenges, solutions, and technological interventions. <i>Future Internet, 17</i>(4), 133. <a href=\"https://doi.org/10.3390/fi17040133\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.3390/fi17040133</a>",
 "Borgianni, L., Adami, D., Giordano, S., y Pagano, M. (2024). Enhancing reliability in rural networks using a software-defined wide area network. <i>Computers, 13</i>(5), 113. <a href=\"https://doi.org/10.3390/computers13050113\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.3390/computers13050113</a>",
 "Borgianni, L., Ghadir, D., Ghadir, S., Adami, D., y Giordano, S. (2025). Proximal policy optimization for AI-orchestrated SD-WAN in underserved regions. En <i>2025 IEEE Conference on Network Function Virtualization and Software-Defined Networking (NFV-SDN)</i>. IEEE. <a href=\"https://doi.org/10.1109/NFV-SDN66355.2025.11349437\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.1109/NFV-SDN66355.2025.11349437</a>",
 "Borgianni, L., Troia, S., Adami, D., Maier, G., y Giordano, S. (2023). Assessing the efficacy of reinforcement learning in enhancing quality of service in SD-WANs. En <i>GLOBECOM 2023 – 2023 IEEE Global Communications Conference</i> (pp. 1765–1770). IEEE. <a href=\"https://doi.org/10.1109/GLOBECOM54140.2023.10437333\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.1109/GLOBECOM54140.2023.10437333</a>",
 "Cheimaras, V., Papagiakoumos, S., Peladarinos, N., Trigkas, A., Papageorgas, P., Piromalis, D. D., y Munteanu, R. A. (2024). Low-cost, open-source, experimental setup communication platform for emergencies, based on SD-WAN technology. <i>Telecom, 5</i>(2), 347–368. <a href=\"https://doi.org/10.3390/telecom5020018\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.3390/telecom5020018</a>",
 "Cheng, W., Yang, F., Han, T., Han, R., Jiang, W., Zhang, G., Yang, J., y Zhang, X. (2022). The smart SD-WAN architecture. En <i>2022 IEEE International Conference on Communication Technology (ICCT)</i> (pp. 667–671). IEEE. <a href=\"https://doi.org/10.1109/ICCT56141.2022.10072627\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.1109/ICCT56141.2022.10072627</a>",
 "Departamento Administrativo Nacional de Estadística [DANE]. (2025). <i>Encuesta de Tecnologías de la Información y las Comunicaciones en Hogares (ENTIC Hogares) – 2024</i> [Boletín técnico]. <a href=\"https://www.dane.gov.co/files/operaciones/ENTIC/bol-ENTICHogares-2024.pdf\" target=\"_blank\" rel=\"noopener\">https://www.dane.gov.co/files/operaciones/ENTIC/bol-ENTICHogares-2024.pdf</a>",
 "Dudczyk, J., Sergiel, M., y Krygier, J. (2025). Analysis of SD-WAN architectures and techniques for efficient traffic control under transmission constraints—Overview of solutions. <i>Sensors, 25</i>(20), 6317. <a href=\"https://doi.org/10.3390/s25206317\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.3390/s25206317</a>",
 "Fu, C., Wang, B., y Wang, W. (2024). Software-defined wide area networks (SD-WANs): A survey. <i>Electronics, 13</i>(15), 3011. <a href=\"https://doi.org/10.3390/electronics13153011\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.3390/electronics13153011</a>",
 "Hoyos, J. A., Valencia, D. C., Piedrahita, L. B., y Jiménez, E. S. (2023). Characterization of digital inclusion processes in rural communities in the context of the SDGs. <i>RISTI – Revista Ibérica de Sistemas e Tecnologias de Informação</i>, (E56), 182–194.",
 "Hussain, I. S., Yuvanesh, S., y Yokesh, S. (2023). Revolutionizing networking: An exploration of software-defined networking. En <i>2023 2nd International Conference on Automation, Computing and Renewable Systems (ICACRS)</i> (pp. 1020–1026). IEEE. <a href=\"https://doi.org/10.1109/ICACRS58579.2023.10404534\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.1109/ICACRS58579.2023.10404534</a>",
 "Ibrahim, R., Khider, I., Edam, S., y Mukhtar, T. (2025). Comprehensive strategies for enhancing SD-WAN: Integrating security, dynamic routing and quality of service management. <i>IET Networks, 14</i>(1), e70007. <a href=\"https://doi.org/10.1049/ntw2.70007\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.1049/ntw2.70007</a>",
 "Kankipati, C. S., Kancharla, K., Rampalli, N. S., Bandi, S., y Chintala, R. R. (2023). The role of SD-WAN in cloud connectivity and digital transformation. En <i>2023 4th International Conference on Electronics and Sustainable Communication Systems (ICESC)</i> (pp. 1169–1173). IEEE. <a href=\"https://doi.org/10.1109/ICESC57686.2023.10193213\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.1109/ICESC57686.2023.10193213</a>",
 "Mendoza-Lozano, F. A., Quintero-Peña, J. W., y García-Rodríguez, J. F. (2021). The digital divide between high school students in Colombia. <i>Telecommunications Policy, 45</i>(10), 102226. <a href=\"https://doi.org/10.1016/j.telpol.2021.102226\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.1016/j.telpol.2021.102226</a>",
 "Navarro, A., Canonico, R., y Botta, A. (2023). Software defined wide area networks: Current challenges and future perspectives. En <i>2023 IEEE 9th International Conference on Network Softwarization (NetSoft)</i> (pp. 350–353). IEEE. <a href=\"https://doi.org/10.1109/NetSoft57336.2023.10175458\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.1109/NetSoft57336.2023.10175458</a>",
 "Ouamri, M. A., Alharbi, T., Singh, D., y Sylia, Z. (2025). A comprehensive survey on software-defined wide area network (SD-WAN): Principles, opportunities and future challenges. <i>The Journal of Supercomputing, 81</i>(1), 291. <a href=\"https://doi.org/10.1007/s11227-024-06718-1\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.1007/s11227-024-06718-1</a>",
 "Padilla, M. O., Soto-Varela, R., y Berrocal, L. O. (2023). From digital divide to digital inclusion in Colombia: A systematic literature review of strategies from education. En <i>From digital divide to digital inclusion: Challenges, perspectives and trends in the development of digital competences</i> (pp. 123–147). Springer. <a href=\"https://doi.org/10.1007/978-981-99-7645-4_6\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.1007/978-981-99-7645-4_6</a>",
 "Unión Internacional de Telecomunicaciones [UIT-T]. (2003). <i>Tiempo de transmisión en un sentido</i> (Recomendación UIT-T G.114). <a href=\"https://www.itu.int/rec/T-REC-G.114\" target=\"_blank\" rel=\"noopener\">https://www.itu.int/rec/T-REC-G.114</a>",
 "Wang, C., Huo, S., Bai, W., y Li, F. (2025). Routing method based on SD-WAN. En <i>Proceedings of the 2024 2nd International Conference on Communication Networks and Machine Learning (CNML 2024)</i> (pp. 43–48). ACM. <a href=\"https://doi.org/10.1145/3701047.3701056\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.1145/3701047.3701056</a>",
 "Zhang, P., He, F., Zhang, H., Hu, J., Huang, X., Wang, J., Yin, X., Zhu, H., y Li, Y. (2023). Real-time malicious traffic detection with online isolation forest over SD-WAN. <i>IEEE Transactions on Information Forensics and Security, 18</i>, 2076–2090. <a href=\"https://doi.org/10.1109/TIFS.2023.3262121\" target=\"_blank\" rel=\"noopener\">https://doi.org/10.1109/TIFS.2023.3262121</a>"
];

/* Cambia a true cuando agregues los audios grabados en la carpeta audio/ (p01.mp3 … p18.mp3). */
var AUDIOS_GRABADOS = true;
