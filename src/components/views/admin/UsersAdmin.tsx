import React, { SyntheticEvent, useState } from "react";

/* Material UI */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

/* Admins */
import { CoordinatorAdmin } from "@/components/views/admin/usersAdmin/CoordinatorAdmin";
import { TeacherAdmin } from "@/components/views/admin/usersAdmin/TeacherAdmin";
import { StudentesAdmin } from "@/components/views/admin/usersAdmin/StudentesAdmin";

const UsersAdmin = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChangeExpanded =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Box sx={{ /* height: "75vh", */ width: "75vw" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChangeExpanded("panel1")}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Coordinadores</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {expanded === "panel1" && <CoordinatorAdmin />}
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChangeExpanded("panel2")}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Maestros</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {expanded === "panel2" && <TeacherAdmin />}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChangeExpanded("panel3")}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Estudiantes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {expanded === "panel3" && <StudentesAdmin />}
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
};

export { UsersAdmin };
