import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconBuildings,
  IconCalendarStats,
  IconGauge,
  IconUsers
} from "@tabler/icons-react";
import { Tooltip, UnstyledButton } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./DoubleNavbar.module.css";

const mainLinksMockdata = [
  { icon: IconGauge, label: "Dashboard", path: "/" },
  { icon: IconBuildings, label: "Condomínios", path: "/" },
  { icon: IconUsers, label: "Moradores", path: "/" },
  { icon: IconCalendarStats, label: "Calendário", path: "/" },
];

export default function DoubleNavbar() {
  const [active, setActive] = useState("Releases");
  const navigate = useNavigate();

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => {
          setActive(link.label);
          navigate(link.path);
        }}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon size={22} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.aside}>
        <div className={classes.logo}>
          <MantineLogo type="mark" size={30} />
        </div>
        {mainLinks}
      </div>
    </nav>
  );
}
