import MIcon from "@expo/vector-icons/MaterialIcons";
import {
  LmCheckboxRhf,
  LmFormRhfProvider,
  LmInputRhf,
  LmRadioGroupRhf,
  LmSelectRhf,
} from "@tamagui-extras/form";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { YStackProps } from "tamagui";
import { Button, H3, XStack, YStack } from "tamagui";
import { z } from "zod";

import { CustomDialog } from "~/components/ui/custom-dialog";
import { useLangStore } from "~/store/lang-store";
import { getRegions, getSellers } from "~/utils/api-utils";

export const filterSchema = z.object({
  price: z.object({
    from: z.string().transform((v) => Number(v)),
    to: z.string().transform((v) => Number(v)),
  }),
  has_credit: z.boolean().default(false),
  all_regions: z.boolean().default(true),
  manifacturer: z.string().transform((v) => Number(v)),
  region_id: z.string().transform((v) => Number(v)),
  district_id: z.string().transform((v) => Number(v)),
  direction_id: z.string().transform((v) => Number(v)),
  delivery_type: z.enum(["courier", "pickup"]),
  unit: z.enum(["piece", "kilogram", "ton", "liter"]),
});

type FilterFields = z.infer<typeof filterSchema>;

export function HeaderFilterComponent() {
  const { lang } = useLangStore();
  const { data: regions } = useQuery<Region>({
    queryKey: ["region"],
    queryFn: async () => await getRegions(lang),
    refetchOnMount: false,
    keepPreviousData: true,
    refetchInterval: 3600,
  });
  const { data: sellers } = useQuery<Seller>({
    queryKey: ["seller"],
    queryFn: async () => await getSellers({ lang }),
    refetchOnMount: false,
    keepPreviousData: true,
    refetchInterval: 3600,
  });
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        backgroundColor="#ccc"
        fontWeight="500"
        onPress={() => setOpen((prev) => !prev)}
        icon={<MIcon name="filter-list-alt" size={24} />}
      >
        Filter
      </Button>
      <CustomDialog
        dialogHeaderStyles={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        dialogHeaderChildren={
          <>
            <Button
              padding={0}
              backgroundColor="transparent"
              height={20}
              color="#FF4269"
            >
              Reset
            </Button>
          </>
        }
        description=""
        title="Filter"
        trigger={<></>}
        open={open}
        setOpen={setOpen}
        closeContent={
          <Button className="w-full" color="white" backgroundColor="blue">
            Apply
          </Button>
        }
      >
        <YStack>
          <LmFormRhfProvider<FilterFields>
            defaultValues={{
              all_regions: true,
              delivery_type: "pickup",
              unit: "piece",
            }}
          >
            {({ control, getValues }) => {
              const region = getValues("region_id");
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const districts = useMemo(
                () =>
                  regions?.data.find((r) => r.id === Number(region))?.districts,
                [region],
              );
              return (
                <>
                  <YStack>
                    <FilterGroup title="Price">
                      <XStack gap="$2" justifyContent="space-between">
                        <LmInputRhf
                          className="w-1/2 flex-1"
                          containerProps={{
                            flex: 1,
                          }}
                          control={control}
                          placeholder="From"
                          name="price.from"
                        />
                        <LmInputRhf
                          className="w-1/2 flex-1"
                          containerProps={{
                            flex: 1,
                          }}
                          control={control}
                          placeholder="To"
                          name="price.to"
                        />
                      </XStack>
                      <XStack gap="$2" justifyContent="space-between">
                        <LmCheckboxRhf
                          label="Has credit"
                          className="flex-1 checked:bg-red-400"
                          padding="$2"
                          control={control}
                          name="has_credit"
                          helperTextProps={{
                            fontSize: 12,
                          }}
                          checkboxProps={{
                            width: 24,
                            height: 24,
                            borderRadius: 10,
                            className: "checked:bg-red-400",
                          }}
                        />
                        <LmCheckboxRhf
                          label="By all regions"
                          className="flex-1"
                          padding="$2"
                          control={control}
                          name="all_regions"
                          checkboxProps={{
                            width: 24,
                            height: 24,
                            borderRadius: 10,
                          }}
                        />
                      </XStack>
                    </FilterGroup>
                    <FilterGroup title="Sellers">
                      <YStack gap="$3">
                        <LmSelectRhf
                          fullWidth
                          size="$4"
                          placeholder="Choose seller"
                          options={
                            sellers?.data?.[0]?.items.map((seller) => ({
                              label: seller.name,
                              value: seller.id,
                            })) ?? []
                          }
                          name="manifacturer"
                          control={control}
                        />
                      </YStack>
                    </FilterGroup>
                    <FilterGroup title="Region">
                      <YStack gap="$3">
                        <LmSelectRhf
                          fullWidth
                          size="$4"
                          placeholder="Choose region"
                          options={
                            regions?.data.map((region) => ({
                              label: region.name,
                              value: region.id,
                            })) ?? []
                          }
                          name="region_id"
                          control={control}
                        />
                        <LmSelectRhf
                          fullWidth
                          size="$4"
                          autoComplete="true"
                          placeholder="Choose district"
                          options={
                            districts?.map((district) => ({
                              label: district.name,
                              value: district.id,
                            })) ?? []
                          }
                          name="district_id"
                          control={control}
                        />
                      </YStack>
                    </FilterGroup>
                    <FilterGroup title="Delivery Type">
                      <LmRadioGroupRhf
                        justifyContent="space-between"
                        gap="$2"
                        name="delivery_type"
                        flexDirection="row"
                        control={control}
                        options={[
                          {
                            label: "Courier Delivery",
                            value: "courier" as FilterFields["delivery_type"],
                          },
                          {
                            label: "Pickup",
                            value: "pickup" as FilterFields["delivery_type"],
                          },
                        ]}
                      />
                    </FilterGroup>
                  </YStack>
                </>
              );
            }}
          </LmFormRhfProvider>
        </YStack>
      </CustomDialog>
    </>
  );
}

interface FilterGroupProps extends YStackProps {
  title: string;
}

function FilterGroup({ title, children }: FilterGroupProps) {
  return (
    <YStack gap="$3" className="border-b border-[#E8EAEE] py-6">
      <H3 fontWeight="600" fontSize={15} color="#095AE3">
        {title}
      </H3>
      {children}
    </YStack>
  );
}
