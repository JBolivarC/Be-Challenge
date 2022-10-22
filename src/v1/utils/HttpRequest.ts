import axios from "axios";
import { config } from "../config/environments";
import { setTimeout } from 'timers/promises';

export class HttpRequest {
  reqTimes: number
  now: number

  constructor(_now: number) {
    this.now = _now
    this.reqTimes = 0
  }

  async Get(url: string): Promise<any> {
    console.log(`this.reqTimes=>${this.reqTimes}`)
    console.log(`url=>${url}`)
    if(this.reqTimes < 10) {
      const { data } = await axios.get(url, { headers: { 'X-Auth-Token': config.football_api_token } })
      this.reqTimes++
      return data
    } else {
      console.log('Limit reached, waiting 1 minute...')
      await setTimeout(60000, 'resolved')
      this.reqTimes = 0
      return this.Get(url)
      // setTimeout(() => {
      //   this.reqTimes = 0
      //   this.Get(url)
      // }, 60000)
    }
  }
}