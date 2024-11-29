import React, {
  useState,
  // ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Slider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

interface ConfigProps {
  restrictionOne: {
    hoursMin: number;
    hoursMax: number;
    autoArrage: boolean;
  };
  restrictionTwo: {
    hoursMaxPerDay: number;
    hoursMaxPerWeek: number;
    autoArrage: boolean;
  };
}

const initialConfig: ConfigProps = {
  restrictionOne: { hoursMin: 8, hoursMax: 14, autoArrage: true },
  restrictionTwo: {
    hoursMaxPerDay: 5,
    hoursMaxPerWeek: 25,
    autoArrage: true,
  },
};

const ScheduleRestrictions = ({
  onChange,
}: {
  onChange: Dispatch<SetStateAction<ConfigProps>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ConfigProps>(initialConfig);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setConfig(initialConfig);
    setErrors({});
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const hoursMaxPerWeek = Array.isArray(newValue) ? newValue[0] : newValue;
    setConfig((prev) => ({
      ...prev,
      restrictionTwo: {
        ...prev.restrictionTwo,
        hoursMaxPerWeek,
        hoursMaxPerDay: hoursMaxPerWeek / 5,
      },
    }));
  };

  const handleEntryHourChange = (event: SelectChangeEvent) => {
    const personalEntryHour = event.target.value;
    const entryHour = parseInt(personalEntryHour.split(":")[0], 10);
    const exitHour = entryHour + config.restrictionTwo.hoursMaxPerDay;

    if (exitHour > 21) {
      // Limpiar el campo de hora de entrada si la suma supera las 9:00 p.m.
      setErrors({
        personalEntryHour: "La hora de salida excede las 9:00 p.m.",
      });
      setConfig((prev) => ({
        ...prev,
        restrictionOne: {
          ...prev.restrictionOne,
          hoursMin: 0, // Reiniciar la hora de entrada
        },
      }));
    } else {
      setErrors((prev) => ({ ...prev, personalEntryHour: "" }));
      setConfig((prev) => ({
        ...prev,
        restrictionOne: {
          ...prev.restrictionOne,
          hoursMin: entryHour,
          hoursMax: exitHour,
        },
      }));
    }
  };

  /* const handleRadioChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = event.target.value === "on";
    if (field === "autoArrageOne") {
      setConfig((prev) => ({
        ...prev,
        restrictionOne: { ...prev.restrictionOne, autoArrage: value },
      }));
    } else {
      setConfig((prev) => ({
        ...prev,
        restrictionTwo: { ...prev.restrictionTwo, autoArrage: value },
      }));
    }
  }; */

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!config.restrictionOne.hoursMin) {
      setErrors({
        personalEntryHour: "Debes seleccionar una hora de entrada.",
      });
      return;
    }

    console.log("Restricciones enviadas:", config);
    onChange(config);
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
              {/* Restricción 1 */}
              <Box>
                <p>
                  Las clases inician de 8:00 a.m. y terminan a las 9:00 p.m.
                </p>
                <p>Seleccione las horas semanales:</p>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Slider
                    defaultValue={40}
                    min={25}
                    max={50}
                    step={5}
                    value={config.restrictionTwo.hoursMaxPerWeek}
                    onChange={handleSliderChange}
                    aria-label="Horas semanales"
                    valueLabelDisplay="auto"
                  />
                  <TextField
                    label="Horas diarias"
                    value={config.restrictionTwo.hoursMaxPerDay}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>
              </Box>

              {/* Restricción 2 */}
              {/* <Box>
                <FormControl>
                  <FormLabel>Ajuste automático de materias</FormLabel>
                  <RadioGroup
                    row
                    value={config.restrictionTwo.autoArrage ? "on" : "off"}
                    onChange={(e) => handleRadioChange(e, "autoArrageTwo")}
                  >
                    <FormControlLabel
                      value="on"
                      control={<Radio />}
                      label="On"
                    />
                    <FormControlLabel
                      value="off"
                      control={<Radio />}
                      label="Off"
                    />
                  </RadioGroup>
                </FormControl>
              </Box> */}

              {/* Restricción 3 (Opción Independiente) */}
              {/*  <Box>
                <FormControl>
                  <FormLabel>Opción independiente</FormLabel>
                  <RadioGroup
                    row
                    value={config.restrictionTwo.autoArrage ? "on" : "off"}
                    onChange={(e) => handleRadioChange(e, "independentRadio")}
                  >
                    <FormControlLabel
                      value="on"
                      control={<Radio />}
                      label="On"
                    />
                    <FormControlLabel
                      value="off"
                      control={<Radio />}
                      label="Off"
                    />
                  </RadioGroup>
                </FormControl>
              </Box> */}

              {/* Hora de entrada */}
              <Box>
                <Typography variant="subtitle1">
                  Hora de entrada personal:
                </Typography>
                <Select
                  value={
                    config.restrictionOne.hoursMin
                      ? `${config.restrictionOne.hoursMin}:00`
                      : ""
                  }
                  onChange={handleEntryHourChange}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Seleccione una hora de entrada
                  </MenuItem>
                  {[...Array(12)].map((_, index) => {
                    const hour = 8 + index; // Desde las 8:00 AM hasta las 9:00 AM
                    const formattedHour = `${hour}:00`;
                    return (
                      <MenuItem key={hour} value={formattedHour}>
                        {formattedHour}
                      </MenuItem>
                    );
                  })}
                </Select>
                {errors.personalEntryHour && (
                  <Typography color="error">
                    {errors.personalEntryHour}
                  </Typography>
                )}
              </Box>

              {/* Hora de salida */}
              <Box>
                <TextField
                  label="Hora de salida"
                  value={
                    config.restrictionOne.hoursMin
                      ? `${config.restrictionOne.hoursMin + config.restrictionTwo.hoursMaxPerDay}:00`
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
              disabled={!config.restrictionOne.hoursMin}
            >
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ScheduleRestrictions;
