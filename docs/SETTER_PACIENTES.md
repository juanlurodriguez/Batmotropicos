# Atención de solicitudes de fisioterapia — preparación, no activación

Autorizado por Juanlu en esta conversación el 21/10/2026: atención administrativa
de solicitudes entrantes por setter, con derivación humana cuando no pueda resolverlas.
No cambia los permisos del setter B2B de Batmotropicos-AI.

## Estado real

- `/cita` prepara un email dirigido a contacto@juanlurodriguez.com con asunto
  `[CITA FISIO] Solicitud de cita`. El visitante debe enviarlo en su cliente de correo.
- `/paciente` es la ficha clínica, no el punto de captación. No se modifica.
- No se ha activado un lector/responder de buzón ni un proceso permanente.
- No se ha creado una cuenta o evento de agenda, ni reservado ninguna cita.
- `PUBLIC_PATIENT_BOOKING_URL` solo debe contener una URL HTTPS de un evento de
  fisioterapia propio y verificado. Sin ella no aparece un botón de reserva.
  No reutilizar el evento comercial `/batmotropicos/diagnostico`.

## Base de conocimiento autorizada

- Profesional: Juan Luis Rodríguez Ávila, fisioterapeuta, colegiado 2498.
- Adultos; problemas musculoesqueléticos; Inca presencial y modalidad online.
- Presencial 55 €, unos 55 minutos, valoración + tratamiento + pautas.
- Online 40 €; duración pendiente de concretar. No inventar duración.
- No aseguradoras. No inventar descuentos, bonos, disponibilidad ni condiciones de pago.
- La técnica invasiva no se vende ni se promete: el fisioterapeuta decide tras valorar.
- No suelo pélvico, oncología, neurología, pediatría ni rehabilitación especializada
  de la discapacidad. Una discapacidad no implica rechazar automáticamente a una persona:
  derivar a Juanlu si la consulta está relacionada con accesibilidad o alcance clínico.

## Contrato para el futuro adaptador de email

1. Procesar solo solicitudes entrantes verificadas de fisioterapia; no campañas en frío.
2. Identificarse como asistente de Juan Luis; no fingir que responde personalmente.
3. Puede responder sobre precio, modalidad, duración confirmada y pasos para pedir cita.
4. Pedir únicamente nombre, modalidad y disponibilidad. El email ya identifica el canal.
5. Ofrecer el enlace de agenda solo si está configurado y comprobado. Hasta entonces,
   registrar solicitud pendiente y pedir intervención para concertar horario.
6. Nunca afirmar «confirmada» sin evidencia de reserva y sin conflictos de calendario.
7. Derivar preguntas clínicas, contraindicaciones, cambios de tratamiento, solicitudes fuera
   de alcance, dudas sin respuesta y petición expresa de hablar con Juanlu. No diagnosticar,
   priorizar clínicamente, evaluar aptitud ni prometer resultados.
8. No remitir la ficha de salud antes de concertar cita. No copiarla al CRM B2B ni a Git.
9. No responder a mensajes automáticos, rebotes, listas o mensajes propios; deduplicar por
   ID de mensaje; conservar el hilo y no reintentar envíos de resultado incierto.
10. Un escalado debe notificar realmente a Juanlu por un canal acordado, no solo marcar un
    estado. Registrar por separado respuesta preparada, enviada, solicitud y cita confirmada.

## Antes de activar

Identificar el equipo/servicio donde corre el setter y el acceso OAuth del buzón correcto;
confirmar que contacto@juanlurodriguez.com llega a él y permite responder desde esa identidad;
configurar los horarios de Juanlu, duración online y eventos de agenda; probar con mensajes
ficticios precios, petición de cita, preguntas clínicas, bucles, duplicados y fallos.
No dar por probada la integración por disponer del conector Gmail de ChatGPT.

## Agenda propuesta

Dos eventos independientes: presencial 55 minutos / 55 €; online 40 € con duración
que confirme Juanlu. Zona Europe/Madrid, márgenes entre sesiones, sin cobrar a través
de la agenda inicialmente. Revisión personal de solicitudes al inicio. No publicar horarios
inferidos de su trabajo en IB-Salut ni inventar una política de cancelación.
