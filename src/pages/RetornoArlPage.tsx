import { Card, CardBody, CardHeader, Flex } from "@chakra-ui/react";

import ReactApexChart from "react-apexcharts";
// import { getTitle } from "../helpers";

export const RetornoArlPage = () => {
  const header = ["VH", "VM", "X"];

  console.log("header", header);
  const meses = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];

  const porc = [0, 0, 1, 2, 5, 6, 7, 5, 5];
  const firstP = [0, 0, 1, 2, 5, 6, 7, 5, 5];
  const secondP = [0, 0, 1, 2, 5, 6, 7, 5, 5];

  console.log("porc", porc);
  console.log("firstP", firstP);
  console.log("secondP", secondP);

  const arrData = header.map((key, i) => {
    if (i === 0) return { name: key, data: firstP, type: "column" };
    if (i === 1) return { name: key, data: secondP, type: "column" };
    return { name: key, data: porc, type: "line" };
  });

  return (
    <Flex direction="column" pt={{ sm: "120px", md: "75px" }} margin="40px">
      <Card>
        <CardHeader>
          INFORME DE{" "}
          <span style={{ textTransform: "uppercase" }}>retorno arl</span>
        </CardHeader>
        <CardBody>
          <ReactApexChart
            type="line"
            series={arrData}
            options={{
              chart: {
                height: 350,
                type: "line",
                width: "100%",
                dropShadow: {
                  enabled: true,
                  color: "#000",
                  top: 18,
                  left: 7,
                  blur: 10,
                  opacity: 0.2,
                },
                toolbar: {
                  show: true,
                },
              },
              colors: ["#0000FF", "#FF8000", "#999"],
              dataLabels: {
                enabled: true,
              },
              stroke: {
                curve: "smooth",
              },
              title: {
                text: "Precios",
                align: "center",
              },
              grid: {
                borderColor: "#e7e7e7",
                row: {
                  colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                  opacity: 0.5,
                },
              },
              markers: {
                size: 1,
              },
              xaxis: {
                categories: meses,
                title: {
                  text: "Meses",
                },
              },
              yaxis: [
                {
                  seriesName: arrData[0].name,
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                  },
                  title: {
                    text: "Trabajadores",
                  },
                },
                {
                  seriesName: arrData[0].name,
                  show: false,
                },
                {
                  opposite: true,
                  seriesName: arrData[2].name,
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                  },
                  title: {
                    text: "Porcentaje",
                  },
                },
                /*  title: {
              text: "Trabajadores",
            }, */
                /*  min: 5,
            max: 40, */
              ],
              legend: {
                position: "bottom",
                horizontalAlign: "center",
                floating: false,
                offsetY: -25,
                offsetX: -5,
              },
            }}
          />
        </CardBody>
      </Card>
    </Flex>
  );
};
