import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInformeApi } from "../fakeApi/useInformeApi";
import ReactApexChart from "react-apexcharts";
import { getTitle } from "../helpers";

export const OneReportePage = () => {
  const ref = useRef(0);

  const { idInforme } = useParams();
  const [getInforme, { data, error, loading }] = useInformeApi();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!idInforme) {
      return navigate("/");
    }

    if (!Number(idInforme)) {
      toast({
        status: "error",
        title: "Error",
        position: "top-right",
        duration: 4000,
        description: "Url incorrecta",
      });
      return navigate("/");
    }

    if (ref.current === 0) {
      getInforme(Number(idInforme));
      ref.current = 1;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idInforme]);

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        position: "top-right",
        duration: 4000,
        title: "ERROR",
        description: error.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (loading) {
    return (
      <Flex
        direction="column"
        pt={{ sm: "120px", md: "75px" }}
        height="30vh"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" color="blue.200" />
      </Flex>
    );
  }

  if (data == null) return null;

  console.log("data", data);

  const header = Object.keys(data.chart[0]).filter(
    (key) => key !== "MES" && key !== "OBSERVACION"
  );
  console.log("header", header);
  const meses = data.chart.map((info) => Number(info.MES));

  const porc = data.chart.map((info) =>
    Number(info.X.replace("%", "").replace(/,/g, "."))
  );
  const firstP = data.chart.map((info) => Number(info[header[0]]));
  const secondP = data.chart.map((info) => Number(info[header[1]]));

  console.log("porc", porc);
  console.log("firstP", firstP);
  console.log("secondP", secondP);

  const arrData = header.map((key, i) => {
    if (i === 0) return { name: key, data: firstP, type: "column" };
    if (i === 1) return { name: key, data: secondP, type: "column" };
    return { name: key, data: porc, type: "line" };
  });

  return (
    <Flex direction="column" pt={{ sm: "120px", md: "75px" }}>
      <Card>
        <CardHeader>
          INFORME DE{" "}
          <span style={{ textTransform: "uppercase" }}>
            {data.info.companyName || ""}
          </span>
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
                text: getTitle(data.info.type),
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
