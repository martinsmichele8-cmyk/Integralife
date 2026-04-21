
export type Language = 'pt' | 'en' | 'es';

export const dictionaries = {
  pt: {
    app_title: "IntegraLife Rubia",
    hub_name: "XMOV Neural Core",
    menu: {
      dashboard: "DASHBOARD CENTRAL",
      insights: "VISÃO 360º INSIGHTS",
      crm: "ORCHESTRATOR CRM",
      billing: "FATURAMENTO AUTO",
      reimbursement: "GESTÃO REEMBOLSO",
      underwriting: "SUBSCRIÇÃO IA",
      assistant: "ASSISTENTE RUBIA",
      meeting: "SALA DE REUNIÃO",
      team: "GESTÃO DE EQUIPE",
      settings: "SEGURANÇA LGPD"
    },
    status: {
      online: "SISTEMA ONLINE",
      offline: "SISTEMA OFFLINE",
      sync_active: "SINCRONIZAÇÃO ATIVA"
    },
    actions: {
      start_meeting: "INICIAR REUNIÃO",
      share_screen: "COMPARTILHAR TELA",
      change_bg: "TROCAR FUNDO",
      send: "ENVIAR",
      generate_report: "GERAR RELATÓRIO",
      record: "GRAVAR SESSÃO",
      stop_record: "PARAR GRAVAÇÃO",
      mute: "MUDO",
      unmute: "ATIVAR ÁUDIO",
      camera_on: "CÂMERA ON",
      camera_off: "CÂMERA OFF",
      end_meeting: "ENCERRAR SESSÃO",
      invite: "CONVIDAR",
      copy_link: "COPIAR LINK"
    }
  },
  en: {
    app_title: "IntegraLife Rubia",
    hub_name: "XMOV Neural Core",
    menu: {
      dashboard: "CENTRAL DASHBOARD",
      insights: "360º INSIGHTS VIEW",
      crm: "CRM ORCHESTRATOR",
      billing: "AUTO BILLING",
      reimbursement: "CLAIM MANAGEMENT",
      underwriting: "AI UNDERWRITING",
      assistant: "RUBIA ASSISTANT",
      meeting: "MEETING ROOM",
      team: "TEAM MANAGEMENT",
      settings: "LGPD SECURITY"
    },
    status: {
      online: "SYSTEM ONLINE",
      offline: "SYSTEM OFFLINE",
      sync_active: "SYNC ACTIVE"
    },
    actions: {
      start_meeting: "START MEETING",
      share_screen: "SHARE SCREEN",
      change_bg: "CHANGE BACKGROUND",
      send: "SEND",
      generate_report: "GENERATE REPORT",
      record: "RECORD SESSION",
      stop_record: "STOP RECORDING",
      mute: "MUTE",
      unmute: "UNMUTE",
      camera_on: "CAMERA ON",
      camera_off: "CAMERA OFF",
      end_meeting: "END SESSION",
      invite: "INVITE",
      copy_link: "COPY LINK"
    }
  },
  es: {
    app_title: "IntegraLife Rubia",
    hub_name: "XMOV Neural Core",
    menu: {
      dashboard: "TABLERO CENTRAL",
      insights: "VISIÓN 360º INSIGHTS",
      crm: "ORCHESTRATOR CRM",
      billing: "FACTURACIÓN AUTO",
      reimbursement: "GESTIÓN REEMBOLSO",
      underwriting: "SUSCRIPCIÓN IA",
      assistant: "ASISTENTE RUBIA",
      meeting: "SALA DE REUNIÓN",
      team: "GESTIÓN DE EQUIPO",
      settings: "SEGURIDAD LGPD"
    },
    status: {
      online: "SISTEMA EN LÍNEA",
      offline: "SISTEMA FUERA DE LÍNEA",
      sync_active: "SINCRONIZACIÓN ACTIVA"
    },
    actions: {
      start_meeting: "INICIAR REUNIÓN",
      share_screen: "COMPARTIR PANTALLA",
      change_bg: "CAMBIAR FONDO",
      send: "ENVIAR",
      generate_report: "GENERAR INFORME",
      record: "GRABAR SESIÓN",
      stop_record: "PARAR GRABACIÓN",
      mute: "SILENCIAR",
      unmute: "ACTIVAR AUDIO",
      camera_on: "CÁMARA ON",
      camera_off: "CÁMARA OFF",
      end_meeting: "FINALIZAR SESIÓN",
      invite: "INVITAR",
      copy_link: "COPIAR ENLACE"
    }
  }
};

export type Dictionary = typeof dictionaries.pt;
