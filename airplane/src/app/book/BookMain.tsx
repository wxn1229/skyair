"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DateInput,
  Divider,
  Image,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Radio,
  RadioGroup,
  Slider,
} from "@nextui-org/react";
import {
  BookCheck,
  BriefcaseBusiness,
  Cloudy,
  Recycle,
  RefreshCcw,
  Search,
  TextSearch,
} from "lucide-react";
import { CalendarDate, parseDate } from "@internationalized/date";
import { Key, useCallback, useEffect, useState } from "react";
import { default as axios } from "@/utils/axios";
import { on } from "events";
type Flight = {
  flightId: string;
  departure: string;
  departureTime: string;
  destination: string;
  arrivalTime: string;
  flightDuration: number;
};

type FlightsData = {
  flights: Flight[];
};

export default function BookMain() {
  const [bookId, setBookId] = useState("");
  useEffect(() => {
    console.log("🚀 ~ BookMain ~ bookId:", bookId);
  }, [bookId]);
  const cities = [
    { key: "taipei", label: "台北" },
    { key: "seoul", label: "首爾" },
    { key: "osaka", label: "大阪" },
  ];

  const columns = [
    { name: "航班編號", uid: "flightId" },
    { name: "出發地", uid: "departure" },
    { name: "出發時間", uid: "departureTime" },
    { name: "目的地", uid: "destination" },
    { name: "抵達時間", uid: "arrivalTime" },
    { name: "飛行時長", uid: "flightDuration" },
    { name: "預定", uid: "book" },
  ];
  const [flights, setFlights] = useState<Flight[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    async function getData() {
      try {
        const data = await axios.get("/flight");

        setFlights(data.data.flights);

        setFilterItems(data.data.flights);
      } catch (error) {
        console.log("🚀 ~ getData ~ error:", error);
      }
    }
    getData();
  }, []);
  type FormData = {
    id: string;
    name: string;
    phone: string;
    gender: boolean;
    numberOfPeople: number | number[];
    cabinClass: boolean;
  };
  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: "",
    phone: "",
    gender: false,
    numberOfPeople: 0,
    cabinClass: false,
  });

  async function bookHandler() {
    try {
      const createBook = await axios.post("/createBook", {
        idNumber: formData.id,
        gender: formData.gender,
        name: formData.name,
        phone: formData.phone,
        cabinClass: formData.cabinClass,
        personNumber: formData.numberOfPeople,
        flightId: bookId,
      });
    } catch (error) {
      console.log("🚀 ~ bookHandler ~ error:", error);
    }
  }

  const [userGender, setUserGender] = useState("male");
  useEffect(() => {
    if (userGender === "male") {
      setFormData((s) => {
        return { ...s, gender: true };
      });
    } else {
      setFormData((s) => {
        return { ...s, gender: false };
      });
    }
  }, [userGender]);
  const [userClass, setUserClass] = useState("x");
  useEffect(() => {
    if (userGender === "x") {
      setFormData((s) => {
        return { ...s, gender: true };
      });
    } else {
      setFormData((s) => {
        return { ...s, gender: false };
      });
    }
  }, [userGender]);
  const [Time, setTime] = useState(parseDate("2024-04-04"));
  const [aCity, setACity] = useState("");

  const [dCity, setDCity] = useState("");

  useEffect(() => {
    console.log("🚀 ~ BookMain ~ aCity:", aCity);

    console.log("🚀 ~ BookMain ~ dCity:", dCity);
    console.log("🚀 ~ BookMain ~ Time:", Time);
  }, [Time, aCity, dCity]);
  const getCityLabel = (key: string) => {
    const city = cities.find((city) => city.key === key);
    return city ? city.label : "";
  };
  const [filterItems, setFilterItems] = useState<Flight[]>([]);

  const filterFlights = (items: Flight[]) => {
    const departureCity = getCityLabel(dCity);
    const arrivalCity = getCityLabel(aCity);
    return items.filter((item) => {
      const flightDate = new Date(item.departureTime)
        .toISOString()
        .split("T")[0];
      const selectedDate = Time.toString().split("T")[0];
      return (
        item.departure === departureCity &&
        item.destination === arrivalCity &&
        flightDate === selectedDate
      );
    });
  };
  const renderCell = useCallback((flight: Flight, columnKey: Key) => {
    const cellValue = flight[columnKey as keyof Flight];

    switch (columnKey) {
      case "book":
        return (
          <Button
            onClick={() => {
              setBookId(flight.flightId);
              onOpen();
            }}
            color="success"
          >
            預定
          </Button>
        );
      case "departureTime":
        return <p>{cellValue.toString().split("T")[0]}</p>;
      case "arrivalTime":
        return <p>{cellValue.toString().split("T")[0]}</p>;
      case "flightDuration":
        return <p>{cellValue.toString()} hr</p>;
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center ">
      <Card className="w-[80vw] h-[90vh]" radius="lg">
        <CardHeader className="flex justify-center items-center gap-3">
          <div className="flex justify-center items-center">
            <div className="font-bold text-4xl">訂票系統</div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-10 w-full">
          <div className="flex justify-center w-full">
            <div className="flex gap-5 w-full justify-center items-center">
              <Select
                label="出發地"
                placeholder="Select an animal"
                className="max-w-xs"
                variant="faded"
                value={[dCity]}
                onChange={(e) => {
                  setDCity(e.target.value);
                }}
              >
                {cities.map((city) => (
                  <SelectItem key={city.key}>{city.label}</SelectItem>
                ))}
              </Select>
              <Select
                label="目的地"
                placeholder="Select an animal"
                className="max-w-xs"
                variant="faded"
                value={[aCity]}
                onChange={(e) => {
                  setACity(e.target.value);
                }}
              >
                {cities.map((city) => (
                  <SelectItem key={city.key}>{city.label}</SelectItem>
                ))}
              </Select>
              <DateInput
                label={"搭乘日期"}
                variant="faded"
                value={Time}
                onChange={(e) => {
                  setTime(e);
                }}
                startContent={
                  <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                className="max-w-sm"
              />
              <Button
                onClick={() => {
                  setFilterItems(filterFlights(flights));
                }}
                startContent={<Search></Search>}
                color="primary"
              >
                搜尋
              </Button>
              <Button
                onClick={() => {
                  setFilterItems(flights);
                }}
                startContent={<RefreshCcw />}
                color="success"
              >
                重新整理
              </Button>
            </div>
          </div>
          <div className="w-full">
            <Table aria-label="Example table with custom cells">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={filterItems}>
                {(item) => (
                  <TableRow key={item.flightId}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardBody>
        <Divider />
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                訂購人資訊
              </ModalHeader>
              <ModalBody>
                <div>身分證</div>
                <Input
                  type="text"
                  variant="bordered"
                  value={formData.id}
                  onChange={(e) => {
                    setFormData({ ...formData, id: e.target.value.trim() });
                  }}
                ></Input>
                <div>姓名</div>
                <Input
                  type="text"
                  variant="bordered"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value.trim() });
                  }}
                ></Input>

                <div>電話</div>
                <Input
                  type="text"
                  variant="bordered"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value.trim() });
                  }}
                ></Input>
                <div>性別</div>
                <RadioGroup
                  orientation="horizontal"
                  defaultValue="male"
                  value={userGender}
                  onValueChange={setUserGender}
                >
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                </RadioGroup>
                <Slider
                  step={1}
                  label="人數"
                  maxValue={10}
                  minValue={1}
                  defaultValue={1}
                  className="max-w-md"
                  value={formData.numberOfPeople}
                  onChange={(e) => {
                    setFormData({ ...formData, numberOfPeople: e });
                  }}
                />
                <div>艙別</div>
                <RadioGroup
                  orientation="horizontal"
                  value={userClass}
                  onValueChange={setUserClass}
                >
                  <Radio value="x">經濟艙</Radio>
                  <Radio value="o">商務艙</Radio>
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    bookHandler();
                    onClose();
                  }}
                >
                  確認
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

const CalendarIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M7.75 2.5a.75.75 0 0 0-1.5 0v1.58c-1.44.115-2.384.397-3.078 1.092c-.695.694-.977 1.639-1.093 3.078h19.842c-.116-1.44-.398-2.384-1.093-3.078c-.694-.695-1.639-.977-3.078-1.093V2.5a.75.75 0 0 0-1.5 0v1.513C15.585 4 14.839 4 14 4h-4c-.839 0-1.585 0-2.25.013z"
      fill="currentColor"
    />
    <path
      clipRule="evenodd"
      d="M2 12c0-.839 0-1.585.013-2.25h19.974C22 10.415 22 11.161 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14zm15 2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
