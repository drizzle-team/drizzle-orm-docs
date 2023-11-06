import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useRef,
} from "react";
import { type IData } from "../types";

// Define the shape of your treatment context
interface BenchmarkContextProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  intervalId: React.MutableRefObject<number>;
  concatedDataDrizzle: IData[];
  setConcatedDataDrizzle: React.Dispatch<React.SetStateAction<IData[]>>;
  concatedDataCompare: IData[];
  setConcatedDataCompare: React.Dispatch<React.SetStateAction<IData[]>>;
  isTimerActive: boolean;
  setIsTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the BenchmarkContext
const BenchmarkContext = createContext<BenchmarkContextProps | undefined>(
  undefined,
);

// Create a custom hook to access the BenchmarkContext
export function useBenchmarkContext() {
  const context = useContext(BenchmarkContext);
  if (!context) {
    throw new Error(
      "useBenchmarkContext must be used within a BenchmarkProvider",
    );
  }
  return context;
}

// Define the BenchmarkProvider component
interface BenchmarkProviderProps {
  children: ReactNode;
}

export function BenchmarkProvider({ children }: BenchmarkProviderProps) {
  const [time, setTime] = useState<number>(0);
  const intervalId = useRef<number>(0);
  const [concatedDataDrizzle, setConcatedDataDrizzle] = useState<IData[]>([]);
  const [concatedDataCompare, setConcatedDataCompare] = useState<IData[]>([]);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  const contextValue: BenchmarkContextProps = {
    isTimerActive,
    setIsTimerActive,
    time,
    setTime,
    intervalId,
    concatedDataDrizzle,
    setConcatedDataDrizzle,
    concatedDataCompare,
    setConcatedDataCompare,
  };

  return (
    <BenchmarkContext.Provider value={contextValue}>
      {children}
    </BenchmarkContext.Provider>
  );
}
