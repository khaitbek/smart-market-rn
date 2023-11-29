import React from "react";
import type { LinkProps } from "expo-router";
import { Link } from "expo-router";
import { Button, Card, H3, XStack } from "tamagui";

interface Service {
  name: string;
  link: LinkProps<string>["href"];
}

const services: Service[] = [
  {
    name: "Qur'on",
    link: "/quran/",
  },
  {
    name: "Namoz",
    link: "/",
  },
  {
    name: "Azon",
    link: "/",
  },
  {
    name: "Hadis",
    link: "/",
  },
];

export const Services = () => {
  return (
    <XStack
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      alignContent="center"
      className="pt-24"
      gap={16}
    >
      {services.map((service) => (
        <Card
          flexGrow={1}
          aspectRatio={1}
          width={150}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          rowGap={16}
          key={service.name}
        >
          <H3 className="text-center text-xl">{service.name}</H3>
          <Button themeInverse>
            <Link href={service.link}>Batafsil</Link>
          </Button>
        </Card>
      ))}
    </XStack>
  );
};
