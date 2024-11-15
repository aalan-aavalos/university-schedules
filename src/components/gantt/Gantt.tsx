/* import React, { useEffect } from "react";

import { Timeline, TimelineOptions } from "vis-timeline";
import { DataSet } from "vis-data";
import "vis-timeline/styles/vis-timeline-graph2d.css";

const Gantt = () => {
  const createGantt = () => {
    const groupsGantt = new DataSet([
      { id: 0, content: "Análisis y Diseño de Requisitos" },
      { id: 1, content: "Registro y Autenticación" },
      { id: 2, content: "Cuestionario de Síntomas" },
      { id: 3, content: "Medición de Intensidad Emocional" },
      { id: 4, content: "Historial de Síntomas" },
      { id: 5, content: "Visualización de Resultados" },
      { id: 6, content: "Notificaciones de Recordatorio" },
      { id: 7, content: "Pruebas y Ajustes Generales" },
      { id: 8, content: "Lanzamiento y Revisión Final" },
    ]);

    const itemsGantt = new DataSet([
      // Análisis y Diseño de Requisitos
      {
        id: 0,
        group: 0,
        content: "Identificar requisitos y diseño preliminar",
        start: new Date(2024, 10, 1),
        end: new Date(2024, 10, 14),
      },
      // Registro y Autenticación
      {
        id: 1,
        group: 1,
        content: "Implementar sistema de registro y autenticación",
        start: new Date(2024, 10, 15),
        end: new Date(2024, 10, 28),
      },
      // Cuestionario de Síntomas
      {
        id: 2,
        group: 2,
        content: "Desarrollo del cuestionario de síntomas",
        start: new Date(2024, 10, 29),
        end: new Date(2024, 11, 12),
      },
      // Medición de Intensidad Emocional
      {
        id: 3,
        group: 3,
        content: "Configuración de la medición de intensidad",
        start: new Date(2024, 11, 13),
        end: new Date(2024, 11, 19),
      },
      // Historial de Síntomas
      {
        id: 4,
        group: 4,
        content: "Implementación del historial de síntomas",
        start: new Date(2024, 11, 20),
        end: new Date(2025, 0, 9),
      },
      // Visualización de Resultados
      {
        id: 5,
        group: 5,
        content: "Programación de la visualización de resultados",
        start: new Date(2025, 0, 10),
        end: new Date(2025, 0, 23),
      },
      // Notificaciones de Recordatorio
      {
        id: 6,
        group: 6,
        content: "Configuración de notificaciones de recordatorio",
        start: new Date(2025, 0, 24),
        end: new Date(2025, 0, 30),
      },
      // Pruebas y Ajustes Generales
      {
        id: 7,
        group: 7,
        content: "Pruebas generales y ajustes",
        start: new Date(2025, 0, 31),
        end: new Date(2025, 1, 13),
      },
      // Lanzamiento y Revisión Final
      {
        id: 8,
        group: 8,
        content: "Preparación para lanzamiento y revisión final",
        start: new Date(2025, 1, 14),
        end: new Date(2025, 1, 20),
      },
    ]);

    const options: TimelineOptions = {
      horizontalScroll: true,
      zoomKey: "ctrlKey",
      start: new Date(2024, 10, 1), // Inicio del cronograma
      end: new Date(2025, 1, 20), // Fin del cronograma
      editable: {
        add: true,
        updateTime: true,
        updateGroup: false,
        remove: true,
        overrideItems: true,
      },
      height: "70vh",
      width: "100vw",
      orientation: "top",
      stack: true,
      multiselect: true,
    };

    const container: HTMLElement = document.getElementById(
      "visualization"
    ) as HTMLElement;

    new Timeline(container, itemsGantt, groupsGantt, options);
  };

  useEffect(() => {
    const container = document.getElementById("visualization");
    if (container) {
      container.innerHTML = "";
    }

    createGantt();
  }, []);

  return <div id="visualization">Gantt</div>;
};

export { Gantt };
 */
