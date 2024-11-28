import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  Slider,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

interface RestrictionFormProps {
  preferredTimes: string[];
  maxHoursPerDay: number;
  totalWeeklyHours: number;
  autoAdjust: boolean;
  personalEntryHour: string;
  independentRadio: boolean; // Nuevo estado para el segundo radio button
}

const initialRestrictionForm: RestrictionFormProps = {
  preferredTimes: [],
  maxHoursPerDay: 0,
  totalWeeklyHours: 40,
  autoAdjust: false,
  personalEntryHour: "",
  independentRadio: false, // Valor inicial para el segundo radio button
};

const ScheduleRestrictions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<RestrictionFormProps>(initialRestrictionForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setForm(initialRestrictionForm);
    setErrors({});
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const totalWeeklyHours = Array.isArray(newValue) ? newValue[0] : newValue;
    setForm((prev) => ({
      ...prev,
      totalWeeklyHours,
      maxHoursPerDay: totalWeeklyHours / 5,
    }));
  };

  const handleEntryHourChange = (event: SelectChangeEvent) => {
    const personalEntryHour = event.target.value;
    const entryHour = parseInt(personalEntryHour.split(":")[0], 10);
    const exitHour = entryHour + form.maxHoursPerDay;

    if (exitHour > 21) {
      setErrors({ personalEntryHour: "La hora de salida excede las 9:00 p.m." });
      setForm((prev) => ({ ...prev, personalEntryHour: "" })); // Reiniciar la hora de entrada
    } else {
      setErrors((prev) => ({ ...prev, personalEntryHour: "" }));
      setForm((prev) => ({ ...prev, personalEntryHour }));
    }
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = event.target.value === "on";
    setForm((prev) => ({ ...prev, [field]: value }));
    console.log(`${field}: ${value}`);
  };

  const handleIndependentRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "on";
    setForm((prev) => ({ ...prev, independentRadio: value }));
    console.log("Independent Radio:", value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.personalEntryHour) {
      setErrors({ personalEntryHour: "Debes seleccionar una hora de entrada." });
      return;
    }

    console.log("Restricciones enviadas:", form);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Agregar Restricciones
      </Button>

      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Configuración de restricciones</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "grid", gap: 2 }}>
              <Box>
                <p>Las clases inician de "8:00 a.m. y terminan a las 9:00 p.m."</p>
                <p>Seleccione las horas semanales:</p>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Slider
                    defaultValue={40}
                    min={25}
                    max={50}
                    step={5}
                    value={form.totalWeeklyHours}
                    onChange={handleSliderChange}
                    aria-label="Horas semanales"
                    valueLabelDisplay="auto"
                  />
                  <TextField
                    label="Horas diarias"
                    value={form.maxHoursPerDay}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>
              </Box>

              <Box>
                <FormControl>
                  <FormLabel>Ajuste automático de materias</FormLabel>
                  <RadioGroup
                    row
                    value={form.autoAdjust ? "on" : "off"}
                    onChange={(e) => handleRadioChange(e, "autoAdjust")}
                  >
                    <FormControlLabel value="on" control={<Radio />} label="On" />
                    <FormControlLabel value="off" control={<Radio />} label="Off" />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box>
                <FormControl>
                  <FormLabel>Opción independiente</FormLabel>
                  <RadioGroup
                    row
                    value={form.independentRadio ? "on" : "off"}
                    onChange={handleIndependentRadioChange}
                  >
                    <FormControlLabel value="on" control={<Radio />} label="On" />
                    <FormControlLabel value="off" control={<Radio />} label="Off" />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box>
                <Typography variant="subtitle1">Hora de entrada personal:</Typography>
                <Select
                  value={form.personalEntryHour}
                  onChange={handleEntryHourChange}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Seleccione una hora
                  </MenuItem>
                  {[...Array(12)].map((_, index) => {
                    const hour = 8 + index;
                    const formattedHour = `${hour}:00`;
                    return (
                      <MenuItem key={hour} value={formattedHour}>
                        {formattedHour}
                      </MenuItem>
                    );
                  })}
                </Select>
                {errors.personalEntryHour && (
                  <Typography color="error">{errors.personalEntryHour}</Typography>
                )}
              </Box>

              <Box>
                <TextField
                  label="Hora de salida"
                  value={
                    form.personalEntryHour
                      ? `${parseInt(form.personalEntryHour.split(":")[0], 10) + form.maxHoursPerDay}:00`
                      : ""
                  }
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={!form.personalEntryHour || errors.personalEntryHour !== ""}
            >
              Guardar Restricciones
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export { ScheduleRestrictions };
