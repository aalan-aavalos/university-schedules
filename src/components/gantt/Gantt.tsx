import React, { useEffect } from "react";

import { Timeline, TimelineOptions } from "vis-timeline";
import { DataSet } from "vis-data";
import "vis-timeline/styles/vis-timeline-graph2d.css";

const Gantt = () => {
  const createGantt = () => {
    const groupsGantt = new DataSet([
      { id: 0, content: "First", value: 1 },
      { id: 1, content: "Third", value: 3 },
      { id: 2, content: "Second", value: 2 },
    ]);

    const itemsGantt = new DataSet([
      {
        id: 0,
        group: 0,
        content: "item 0",
        start: new Date(2014, 3, 17),
        end: new Date(2014, 3, 21),
      },
      {
        id: 1,
        group: 0,
        content: "item 1",
        start: new Date(2014, 3, 19),
        end: new Date(2014, 3, 20),
      },
      {
        id: 2,
        group: 1,
        content: "item 2",
        start: new Date(2014, 3, 16),
        end: new Date(2014, 3, 24),
      },
      {
        id: 3,
        group: 1,
        content: "item 3",
        start: new Date(2014, 3, 23),
        end: new Date(2014, 3, 24),
      },
      {
        id: 4,
        group: 1,
        content: "item 4",
        start: new Date(2014, 3, 22),
        end: new Date(2014, 3, 26),
      },
      {
        id: 5,
        group: 2,
        content: "item 5",
        start: new Date(2014, 3, 24),
        end: new Date(2014, 3, 27),
      },
    ]);

    const options: TimelineOptions = {
      horizontalScroll: true,
      zoomKey: "ctrlKey",
      start: new Date(),
      end: new Date(1000 * 60 * 60 * 24 + new Date().valueOf()),
      editable: {
        add: true,
        updateTime: true,
        updateGroup: false,
        remove: true,
        overrideItems: true,
      },
      height: "70vh",
      width: "70vw",
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
