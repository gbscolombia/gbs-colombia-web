import { site } from '@/lib/constants/site';

export const privacyUpdated = { es: '2 de octubre de 2026', en: 'October 2, 2026' } as const;

export const privacyNit = '901.064.502-1';

interface PrivacySection {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
}

interface PrivacyContent {
  kicker: string;
  title: string;
  intro: string;
  updatedLabel: string;
  tocTitle: string;
  sections: PrivacySection[];
}

const es: PrivacyContent = {
  kicker: 'LEGAL',
  title: 'Política de Tratamiento de Datos Personales',
  intro:
    'En GBS Colombia SAS respetamos tu derecho a la intimidad y al habeas data. Esta política explica qué datos personales recolectamos a través de este sitio web y de nuestros canales de contacto, para qué los usamos y cómo puedes ejercer tus derechos, en cumplimiento de la Ley 1581 de 2012 y sus normas reglamentarias.',
  updatedLabel: 'Última actualización',
  tocTitle: 'Contenido',
  sections: [
    {
      id: 'responsable',
      title: '1. Responsable del tratamiento',
      items: [
        `Razón social: ${site.legalName}`,
        `NIT: ${privacyNit}`,
        `Domicilio: ${site.city}, ${site.region}, ${site.country}`,
        `Correo electrónico: ${site.email}`,
        `Teléfono / WhatsApp: ${site.phone}`,
        `Sitio web: ${site.url}`
      ],
      paragraphs: [
        `${site.legalName} hace parte de ${site.parentGroup}. Actúa como responsable del tratamiento de los datos personales que recolecta en este sitio web.`
      ]
    },
    {
      id: 'marco',
      title: '2. Marco normativo',
      paragraphs: ['Esta política se rige por las siguientes normas de la República de Colombia:'],
      items: [
        'Artículo 15 de la Constitución Política (derecho a la intimidad, al buen nombre y al habeas data) y artículo 20 (derecho a la información).',
        'Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales.',
        'Decreto 1377 de 2013, compilado en el Decreto Único 1074 de 2015, que reglamenta parcialmente la Ley 1581.',
        'Ley 1266 de 2008, en lo que resulte aplicable a información financiera, crediticia y comercial.',
        'Circular Única de la Superintendencia de Industria y Comercio (SIC), Título V, y demás normas que modifiquen o complementen las anteriores.'
      ]
    },
    {
      id: 'definiciones',
      title: '3. Definiciones',
      items: [
        'Dato personal: cualquier información vinculada o que pueda asociarse a una persona natural determinada o determinable.',
        'Titular: persona natural cuyos datos personales son objeto de tratamiento.',
        'Tratamiento: cualquier operación sobre datos personales, como recolección, almacenamiento, uso, circulación o supresión.',
        'Responsable: quien decide sobre la base de datos y el tratamiento de los datos.',
        'Encargado: quien realiza el tratamiento de datos por cuenta del responsable.',
        'Autorización: consentimiento previo, expreso e informado del titular para el tratamiento de sus datos.'
      ]
    },
    {
      id: 'datos',
      title: '4. Datos que recolectamos',
      paragraphs: [
        'Recolectamos únicamente los datos que tú nos suministras de forma voluntaria al usar nuestros canales:'
      ],
      items: [
        'Formulario de contacto: nombre completo, empresa, correo electrónico y el contenido de tu mensaje.',
        'Diagnóstico técnico: datos de la empresa y del proyecto (aplicación, material, dimensiones, ciudad), datos de contacto y la información técnica que decidas registrar.',
        'Asistente de IA: el contenido de las consultas que escribas. Te pedimos no incluir datos personales sensibles en ellas.',
        'WhatsApp, teléfono y correo: tu número de contacto, nombre y el contenido de la conversación.',
        'Datos de navegación: dirección IP, tipo de dispositivo y navegador, páginas visitadas y eventos de uso, recolectados mediante cookies y tecnologías similares (ver sección 11).'
      ]
    },
    {
      id: 'sensibles',
      title: '5. Datos sensibles y de menores de edad',
      paragraphs: [
        'No solicitamos datos sensibles (los que afectan la intimidad del titular o cuyo uso indebido puede generar discriminación, como salud, origen racial, orientación política o datos biométricos). Si decides suministrarlos, el tratamiento es facultativo y no condicionamos ningún servicio a que lo hagas.',
        'Este sitio está dirigido a empresas y profesionales. No recolectamos intencionalmente datos de niños, niñas y adolescentes; si detectamos que se han suministrado, los eliminaremos.'
      ]
    },
    {
      id: 'finalidades',
      title: '6. Finalidades del tratamiento',
      paragraphs: ['Usamos tus datos personales para las siguientes finalidades:'],
      items: [
        'Responder tus consultas, solicitudes de cotización y diagnósticos técnicos.',
        'Elaborar propuestas, briefs técnicos, cotizaciones y dar seguimiento comercial a tu solicitud.',
        'Prestar servicios de suministro, ingeniería, instalación, mantenimiento y soporte técnico.',
        'Enviar información técnica y comercial relacionada con nuestros productos y servicios, cuando lo hayas autorizado, con opción de darte de baja en cualquier momento.',
        'Analizar el uso del sitio web para mejorar su contenido, desempeño y experiencia, y medir el resultado de nuestras campañas publicitarias.',
        'Cumplir obligaciones legales, contables y tributarias, y atender requerimientos de autoridades competentes.',
        'Garantizar la seguridad del sitio y prevenir fraudes o usos indebidos.'
      ]
    },
    {
      id: 'principios',
      title: '7. Principios aplicables',
      paragraphs: [
        'El tratamiento de datos personales se rige por los principios de legalidad, finalidad, libertad, veracidad o calidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad previstos en el artículo 4 de la Ley 1581 de 2012.'
      ]
    },
    {
      id: 'autorizacion',
      title: '8. Autorización del titular',
      paragraphs: [
        'El tratamiento de tus datos requiere tu autorización previa, expresa e informada (artículo 9 de la Ley 1581 de 2012). La otorgas al enviarnos voluntariamente tus datos por el formulario de contacto, el diagnóstico técnico, WhatsApp, correo electrónico u otro canal, después de haber tenido la oportunidad de conocer esta política.',
        'Puedes revocar la autorización o solicitar la supresión de tus datos en cualquier momento, salvo que exista un deber legal o contractual de conservarlos. Guardamos prueba de la autorización conforme a la ley.'
      ]
    },
    {
      id: 'derechos',
      title: '9. Derechos del titular',
      paragraphs: ['Como titular de datos personales, tienes derecho a (artículo 8 de la Ley 1581 de 2012):'],
      items: [
        'Conocer, actualizar y rectificar tus datos personales frente a nosotros o a los encargados del tratamiento.',
        'Solicitar prueba de la autorización otorgada, salvo cuando la ley exceptúe este requisito.',
        'Ser informado, previa solicitud, sobre el uso que se ha dado a tus datos.',
        'Presentar ante la Superintendencia de Industria y Comercio quejas por infracciones a la normativa de protección de datos.',
        'Revocar la autorización y/o solicitar la supresión del dato cuando no se respeten los principios, derechos y garantías constitucionales y legales.',
        'Acceder de forma gratuita a tus datos personales que hayan sido objeto de tratamiento.'
      ]
    },
    {
      id: 'consultas',
      title: '10. Consultas y reclamos',
      paragraphs: [
        `Para ejercer tus derechos escríbenos a ${site.email} indicando tu nombre completo, número de identificación, el medio por el cual deseas recibir respuesta y una descripción clara de tu solicitud. Si actúas mediante representante o causahabiente, debes acreditar tal calidad.`,
        'Consultas: las atendemos en un máximo de diez (10) días hábiles contados desde su recibo. Si no es posible hacerlo en ese plazo, te informaremos los motivos y la nueva fecha, que no podrá superar cinco (5) días hábiles adicionales (artículo 14 de la Ley 1581 de 2012).',
        'Reclamos de corrección, actualización o supresión: los atendemos en un máximo de quince (15) días hábiles. Si la solicitud está incompleta, te pediremos subsanarla dentro de los cinco (5) días siguientes. Si no es posible resolver en ese plazo, te informaremos el motivo y la nueva fecha, que no podrá superar ocho (8) días hábiles adicionales (artículo 15).',
        'Solo puedes acudir a la Superintendencia de Industria y Comercio (www.sic.gov.co) una vez hayas agotado este trámite de consulta o reclamo ante nosotros (artículo 16).'
      ]
    },
    {
      id: 'cookies',
      title: '11. Cookies y tecnologías de analítica',
      paragraphs: [
        'Este sitio utiliza cookies y herramientas de terceros para medir el tráfico y el desempeño de nuestras campañas, entre ellas Google Tag Manager, Google Analytics y, cuando están activas, píxeles de plataformas publicitarias como Meta. Estas herramientas recolectan datos de navegación de forma agregada o seudonimizada.',
        'Puedes desactivar o eliminar las cookies desde la configuración de tu navegador, o usar las herramientas de exclusión que ofrecen los proveedores. Hacerlo puede afectar algunas funciones del sitio.'
      ]
    },
    {
      id: 'terceros',
      title: '12. Encargados, transmisión y transferencia de datos',
      paragraphs: [
        'No vendemos tus datos personales. Para operar el sitio y prestar nuestros servicios nos apoyamos en proveedores que actúan como encargados del tratamiento bajo nuestras instrucciones y con deberes de confidencialidad y seguridad:',
        'Alojamiento y entrega del sitio web (Vercel), envío de correos transaccionales (Resend), correo corporativo y analítica (Google), medición publicitaria (Meta) y procesamiento de consultas del asistente de IA (Anthropic).',
        'Algunos de estos proveedores pueden tratar datos en servidores ubicados fuera de Colombia. En esos casos realizamos la transmisión o transferencia internacional conforme a los artículos 25 y 26 de la Ley 1581 de 2012 y exigimos niveles adecuados de protección de datos.',
        `Podemos compartir información con ${site.parentGroup} y sus empresas cuando sea necesario para atender tu solicitud, y con autoridades cuando una norma o una orden judicial lo exija.`
      ]
    },
    {
      id: 'seguridad',
      title: '13. Seguridad de la información',
      paragraphs: [
        'Adoptamos medidas técnicas, humanas y administrativas razonables para proteger tus datos contra pérdida, acceso no autorizado, uso o adulteración, entre ellas conexiones cifradas (HTTPS), control de accesos y confidencialidad de nuestros proveedores. Ningún sistema es completamente infalible; si ocurre un incidente que afecte tus datos, actuaremos conforme a la ley y lo reportaremos a la SIC cuando corresponda.'
      ]
    },
    {
      id: 'conservacion',
      title: '14. Conservación de los datos',
      paragraphs: [
        'Conservamos tus datos durante el tiempo necesario para cumplir las finalidades descritas, la relación comercial y las obligaciones legales, contables y tributarias aplicables. Cumplido ese plazo, los eliminamos o anonimizamos de forma segura.'
      ]
    },
    {
      id: 'vigencia',
      title: '15. Vigencia y modificaciones',
      paragraphs: [
        'Esta política rige desde su publicación y puede ser actualizada para reflejar cambios normativos o en nuestros servicios. Publicaremos la versión vigente en esta misma página con su fecha de actualización y, si los cambios son sustanciales, te lo comunicaremos por los medios disponibles.'
      ]
    },
    {
      id: 'contacto',
      title: '16. Contacto',
      paragraphs: [
        `Para cualquier duda sobre esta política o el tratamiento de tus datos, comunícate con nosotros en ${site.email} o por WhatsApp al ${site.phone}. Horario de atención: lunes a viernes de 8:00 a.m. a 6:00 p.m. (hora de Colombia).`
      ]
    }
  ]
};

const en: PrivacyContent = {
  kicker: 'LEGAL',
  title: 'Personal Data Protection Policy',
  intro:
    'At GBS Colombia SAS we respect your right to privacy and data protection (habeas data). This policy explains which personal data we collect through this website and our contact channels, why we use it, and how you can exercise your rights, in accordance with Colombian Law 1581 of 2012 and its implementing regulations.',
  updatedLabel: 'Last updated',
  tocTitle: 'Contents',
  sections: [
    {
      id: 'responsable',
      title: '1. Data controller',
      items: [
        `Legal name: ${site.legalName}`,
        `Tax ID (NIT): ${privacyNit}`,
        `Address: ${site.city}, ${site.region}, ${site.country}`,
        `Email: ${site.email}`,
        `Phone / WhatsApp: ${site.phone}`,
        `Website: ${site.url}`
      ],
      paragraphs: [
        `${site.legalName} is part of ${site.parentGroup} and acts as the data controller for the personal data collected on this website.`
      ]
    },
    {
      id: 'marco',
      title: '2. Legal framework',
      paragraphs: ['This policy is governed by the following Colombian regulations:'],
      items: [
        'Articles 15 and 20 of the Political Constitution (privacy, good name, habeas data and access to information).',
        'Statutory Law 1581 of 2012, general provisions for the protection of personal data.',
        'Decree 1377 of 2013, compiled in Single Decree 1074 of 2015, partially regulating Law 1581.',
        'Law 1266 of 2008, where applicable to financial, credit and commercial information.',
        'Single Circular of the Superintendence of Industry and Commerce (SIC), Title V, and any rules that amend or supplement the above.'
      ]
    },
    {
      id: 'definiciones',
      title: '3. Definitions',
      items: [
        'Personal data: any information linked or linkable to an identified or identifiable natural person.',
        'Data subject: the natural person whose personal data is processed.',
        'Processing: any operation on personal data, such as collection, storage, use, circulation or deletion.',
        'Controller: who decides on the database and the processing of the data.',
        'Processor: who processes data on behalf of the controller.',
        'Authorization: the prior, express and informed consent of the data subject to the processing of their data.'
      ]
    },
    {
      id: 'datos',
      title: '4. Data we collect',
      paragraphs: ['We only collect the data you voluntarily provide through our channels:'],
      items: [
        'Contact form: full name, company, email address and the content of your message.',
        'Technical diagnostic: company and project data (application, material, dimensions, city), contact details and the technical information you choose to enter.',
        'AI assistant: the content of the queries you type. Please do not include sensitive personal data in them.',
        'WhatsApp, phone and email: your contact number, name and the content of the conversation.',
        'Browsing data: IP address, device and browser type, pages visited and usage events, collected through cookies and similar technologies (see section 11).'
      ]
    },
    {
      id: 'sensibles',
      title: '5. Sensitive data and minors',
      paragraphs: [
        'We do not request sensitive data (data affecting the data subject’s privacy or whose misuse may lead to discrimination, such as health, racial origin, political orientation or biometric data). If you choose to provide it, processing is optional and no service is conditioned on it.',
        'This site is aimed at companies and professionals. We do not knowingly collect data from children or adolescents; if we find that it has been provided, we will delete it.'
      ]
    },
    {
      id: 'finalidades',
      title: '6. Purposes of processing',
      paragraphs: ['We use your personal data for the following purposes:'],
      items: [
        'Answering your inquiries, quote requests and technical diagnostics.',
        'Preparing proposals, technical briefs and quotes, and following up on your request.',
        'Providing supply, engineering, installation, maintenance and technical support services.',
        'Sending technical and commercial information about our products and services when you have authorized it, with the option to opt out at any time.',
        'Analyzing website usage to improve its content, performance and experience, and measuring the results of our advertising campaigns.',
        'Complying with legal, accounting and tax obligations and responding to requests from competent authorities.',
        'Ensuring site security and preventing fraud or misuse.'
      ]
    },
    {
      id: 'principios',
      title: '7. Applicable principles',
      paragraphs: [
        'Processing is governed by the principles of legality, purpose, freedom, accuracy, transparency, restricted access and circulation, security and confidentiality set out in Article 4 of Law 1581 of 2012.'
      ]
    },
    {
      id: 'autorizacion',
      title: '8. Data subject authorization',
      paragraphs: [
        'Processing your data requires your prior, express and informed authorization (Article 9 of Law 1581 of 2012). You grant it by voluntarily sending us your data through the contact form, the technical diagnostic, WhatsApp, email or any other channel, after having had the opportunity to read this policy.',
        'You may revoke your authorization or request deletion of your data at any time, unless there is a legal or contractual duty to keep it. We keep proof of authorization as required by law.'
      ]
    },
    {
      id: 'derechos',
      title: '9. Data subject rights',
      paragraphs: ['As a data subject you have the right to (Article 8 of Law 1581 of 2012):'],
      items: [
        'Know, update and rectify your personal data with us or with our processors.',
        'Request proof of the authorization granted, except where the law exempts it.',
        'Be informed, upon request, about the use made of your data.',
        'File complaints with the Superintendence of Industry and Commerce for violations of data protection rules.',
        'Revoke the authorization and/or request deletion of data when constitutional and legal principles, rights and guarantees are not respected.',
        'Access your processed personal data free of charge.'
      ]
    },
    {
      id: 'consultas',
      title: '10. Inquiries and claims',
      paragraphs: [
        `To exercise your rights, write to ${site.email} stating your full name, ID number, the means by which you wish to receive a reply and a clear description of your request. If you act through a representative or successor, you must prove that capacity.`,
        'Inquiries: answered within ten (10) business days of receipt. If that is not possible, we will tell you why and give a new date, which cannot exceed five (5) additional business days (Article 14 of Law 1581 of 2012).',
        'Claims for correction, update or deletion: answered within fifteen (15) business days. If the request is incomplete, we will ask you to complete it within five (5) days. If it cannot be resolved in that period, we will tell you why and give a new date, which cannot exceed eight (8) additional business days (Article 15).',
        'You may only turn to the Superintendence of Industry and Commerce (www.sic.gov.co) after exhausting this inquiry or claim procedure with us (Article 16).'
      ]
    },
    {
      id: 'cookies',
      title: '11. Cookies and analytics',
      paragraphs: [
        'This site uses cookies and third-party tools to measure traffic and campaign performance, including Google Tag Manager, Google Analytics and, when active, advertising pixels such as Meta. These tools collect browsing data in aggregated or pseudonymized form.',
        'You can disable or delete cookies in your browser settings, or use the opt-out tools offered by the providers. Doing so may affect some site features.'
      ]
    },
    {
      id: 'terceros',
      title: '12. Processors, transmission and transfer of data',
      paragraphs: [
        'We do not sell your personal data. To operate the site and provide our services we rely on providers acting as processors under our instructions, with confidentiality and security duties:',
        'Website hosting and delivery (Vercel), transactional email (Resend), corporate email and analytics (Google), advertising measurement (Meta) and AI assistant query processing (Anthropic).',
        'Some of these providers may process data on servers located outside Colombia. In those cases, international transmission or transfer is carried out in accordance with Articles 25 and 26 of Law 1581 of 2012 and we require adequate levels of data protection.',
        `We may share information with ${site.parentGroup} and its companies when necessary to handle your request, and with authorities when required by law or a court order.`
      ]
    },
    {
      id: 'seguridad',
      title: '13. Information security',
      paragraphs: [
        'We adopt reasonable technical, human and administrative measures to protect your data against loss, unauthorized access, use or alteration, including encrypted connections (HTTPS), access control and confidentiality commitments from our providers. No system is completely infallible; if an incident affecting your data occurs, we will act as required by law and report it to the SIC when applicable.'
      ]
    },
    {
      id: 'conservacion',
      title: '14. Data retention',
      paragraphs: [
        'We keep your data for as long as necessary to fulfil the purposes described, the business relationship and applicable legal, accounting and tax obligations. After that, we securely delete or anonymize it.'
      ]
    },
    {
      id: 'vigencia',
      title: '15. Effective date and changes',
      paragraphs: [
        'This policy is effective from its publication and may be updated to reflect regulatory or service changes. The current version will be published on this page with its update date and, if changes are substantial, we will notify you through the available means.'
      ]
    },
    {
      id: 'contacto',
      title: '16. Contact',
      paragraphs: [
        `For any question about this policy or the processing of your data, contact us at ${site.email} or by WhatsApp at ${site.phone}. Hours: Monday to Friday, 8:00 a.m. to 6:00 p.m. (Colombia time).`
      ]
    }
  ]
};

export function getPrivacyContent(locale: string): PrivacyContent {
  return locale === 'en' ? en : es;
}
