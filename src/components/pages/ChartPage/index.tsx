import { useNavigation } from "@react-navigation/native"
import { Button, View } from "react-native"
import { Victory } from "src/types/victory"
import { objectKeys } from "src/utils/object"

/**
 * copy of:
 * @see https://formidable.com/open-source/victory/gallery/radar-chart/
 */

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
        onPress={() => {
          navigation.navigate("index")
        }}
        title="Go to IndexPage"
      />

      <VictoryChart
        domain={{
          y: [0, 1],
        }}
        polar
        theme={VictoryTheme.material}
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
            // eslint-disable-next-line react/no-array-index-key
            return <VictoryArea data={d} key={i} />
          })}
        </VictoryGroup>

        {objectKeys(maximaDatum).map((key, i) => {
          return (
            <VictoryPolarAxis
              axisValue={i + 1}
              dependentAxis
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              label={key}
              labelPlacement="perpendicular"
              style={{
                axis: { stroke: "none" },
                axisLabel: { fontSize: 24, padding: 10 },
                grid: {
                  opacity: 0.5,
                  stroke: "grey",
                  strokeWidth: 0.25,
                },
              }}
              tickFormat={(t) => Math.ceil(t * maximaDatum[key])}
              tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
              tickValues={[0.25, 0.5, 0.75]}
            />
          )
        })}
        <VictoryPolarAxis
          labelPlacement="parallel"
          style={{
            axis: { stroke: "none" },
            grid: { opacity: 0.5, stroke: "grey" },
          }}
          tickFormat={() => ""}
        />
      </VictoryChart>
    </View>
  )
}
