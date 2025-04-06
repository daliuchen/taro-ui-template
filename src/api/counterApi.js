import { get} from "@/extensions/request";;

export async function getCounter() {
  return get("/counter")
}
