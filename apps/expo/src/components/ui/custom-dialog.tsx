import type { Dispatch, ReactNode, SetStateAction } from "react";
import Ion from "@expo/vector-icons/Ionicons";
import type { DialogContentProps, XStackProps } from "tamagui";
import {
  Adapt,
  Button,
  Dialog,
  ScrollView,
  Sheet,
  Unspaced,
  View,
  XStack,
} from "tamagui";

import { Back } from "./back";

interface CustomDialogProps extends DialogContentProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  trigger: ReactNode;
  closeContent: ReactNode;
  title: string;
  description: string;
  dialogHeaderChildren?: ReactNode;
  dialogHeaderStyles?: XStackProps;
}

export function CustomDialog({
  trigger,
  closeContent,
  title,
  description,
  children,
  open = false,
  setOpen,
  dialogHeaderChildren,
  dialogHeaderStyles,
}: CustomDialogProps) {
  return (
    <Dialog
      modal
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Adapt platform="touch">
        <Sheet
          portalProps={{
            top: -150,
            bottom: 0,
            height: "100vh",
            transform: "none",
            padding: 0,
          }}
          animation="medium"
          zIndex={200000}
          modal
          dismissOnSnapToBottom
        >
          <Sheet.Frame
            top={0}
            transform="none"
            height="100%"
            padding="$4"
            gap="$4"
          >
            <ScrollView>
              <Adapt.Contents />
            </ScrollView>
          </Sheet.Frame>

          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          style={{
            top: 0,
            height: "100%",
            transform: "none",
          }}
          fullscreen
          enterStyle={{ x: 0, y: 0, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 0, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <View>
            <XStack {...dialogHeaderStyles}>
              <Back backgroundColor="primary" />
              <Dialog.Title fontWeight="800" height={22} fontSize={16}>
                {title}
              </Dialog.Title>
              {dialogHeaderChildren}
            </XStack>

            {description.length !== 0 ? (
              <Dialog.Description>{description}</Dialog.Description>
            ) : null}
            {children}
            <XStack alignSelf="flex-end" gap="$4">
              <Dialog.Close displayWhenAdapted asChild>
                {closeContent}
              </Dialog.Close>
            </XStack>
            <Unspaced>
              <Dialog.Close asChild>
                <Button
                  position="absolute"
                  top="$3"
                  right="$3"
                  size="$2"
                  circular
                  onPress={() => setOpen(false)}
                  icon={<Ion name="close-sharp" />}
                >
                  Close
                </Button>
              </Dialog.Close>
            </Unspaced>
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
