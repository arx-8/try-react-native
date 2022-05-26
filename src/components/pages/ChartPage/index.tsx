import { useNavigation } from "@react-navigation/native"
import { Button, View } from "react-native"
import { Victory } from "src/packages/victory"
import { objectKeys } from "src/utils/object"

const {
  VictoryArea,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryPolarAxis,
  VictoryTheme,
} = Victory

const characterData = [
  { charisma: 50, intelligence: 250, luck: 1, stealth: 40, strength: 1 },
  { charisma: 90, intelligence: 300, luck: 2, stealth: 80, strength: 2 },
  { charisma: 120, intelligence: 225, luck: 3, stealth: 60, strength: 5 },
]

type Data = typeof characterData
type Datum = Data[number]
type DatumKey = keyof Datum
type GroupedDatum = {
  [key in DatumKey]: number[]
}
type XYData = {
  x: DatumKey
  y: number
}

const getMaxima = (data: Data): Datum => {
  if (data[0] == null) {
    return {
      charisma: 0,
      intelligence: 0,
      luck: 0,
      stealth: 0,
      strength: 0,
    }
  }

  const groupedData = objectKeys(data[0]).reduce((memo, key) => {
    return {
      ...memo,
      [key]: data.map((x) => x[key]),
    }
  }, {} as GroupedDatum)

  return objectKeys(groupedData).reduce((memo, key) => {
    return {
      ...memo,
      [key]: Math.max(...groupedData[key]),
    }
  }, {} as Datum)
}

const processData = (data: Data): XYData[][] => {
  const maxByGroup = getMaxima(data)
  const makeDataArray = (d: Datum): XYData[] => {
    return objectKeys(d).map((key) => {
      return {
        x: key,
        y: d[key] / maxByGroup[key],
      }
    })
  }
  return data.map((d) => makeDataArray(d))
}

const xyDataList = processData(characterData)
const maximaDatum = getMaxima(characterData)

export const ChartPage = (): JSX.Element => {
  const navigation = useNavigation()

  return (
    <View>
      <Button
        title="Go to HomePage"
        onPress={() => {
          navigation.navigate("home")
        }}
      />

      <VictoryChart
        polar
        theme={VictoryTheme.material}
        domain={{
          y: [0, 1],
        }}
      >
        <VictoryGroup
          colorScale={["gold", "orange", "tomato"]}
          style={{
            data: {
              fillOpacity: 0.2,
              strokeWidth: 2,
            },
          }}
        >
          {xyDataList.map((d, i) => {
            return <VictoryArea key={i} data={d} />
          })}
        </VictoryGroup>

        {objectKeys(maximaDatum).map((key, i) => {
          return (
            <VictoryPolarAxis
              key={i}
              dependentAxis
              style={{
                axis: { stroke: "none" },
                axisLabel: { fontSize: 24, padding: 10 },
                grid: {
                  opacity: 0.5,
                  stroke: "grey",
                  strokeWidth: 0.25,
                },
              }}
              tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
              labelPlacement="perpendicular"
              axisValue={i + 1}
              label={key}
              tickFormat={(t) => Math.ceil(t * maximaDatum[key])}
              tickValues={[0.25, 0.5, 0.75]}
            />
          )
        })}
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickFormat={() => ""}
          style={{
            axis: { stroke: "none" },
            grid: { opacity: 0.5, stroke: "grey" },
          }}
        />
      </VictoryChart>
    </View>
  )
}
