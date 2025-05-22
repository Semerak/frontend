import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function LanguagePicker() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: string | null
  ) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
    }
  };

  return (
    <div className="flex items-center ">
      <ToggleButtonGroup
        value={language}
        exclusive
        onChange={handleChange}
        aria-label="language"
        sx={{
          "& .MuiToggleButtonGroup-grouped": {
            backgroundColor: "transparent",
            px: 0.7,
            border: "none",
            "&.Mui-selected": {
              color: "#906B4D",
            },
            "&:hover": {
              color: "#4d3725",
            },
          },
        }}
      >
        <ToggleButton
          value="en"
          aria-label="english"
          sx={{
            "&.MuiToggleButton-root": {
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          }}
        >
          <Typography variant="body1">EN</Typography>
        </ToggleButton>

        <div className="h-5 w-1 bg-[#906B4D] self-center"></div>

        <ToggleButton
          value="de"
          aria-label="german"
          sx={{
            "&.MuiToggleButton-root": {
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          }}
        >
          <Typography variant="body1">DE</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
