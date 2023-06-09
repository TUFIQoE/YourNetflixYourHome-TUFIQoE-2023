import { ChangeEvent, useState } from "react"
import { ChromeStorage } from "../../../../utils/custom/ChromeStorage"
import { test_server_connection } from "../../../../utils/http_requests/connection_test"
import { validateExperimentConfig } from "../../../../utils/validation/validate-experiment-config"
import { useExperimentStart } from "../../hooks/useExperimentStart"

export type T_TIME = {
    hours: string | null
    minutes: string | null
}

export const useScheduleExperiment = () => {
    const {start_experiment} = useExperimentStart()
    const [scheduled, setScheduled] = useState(false)
    const [time, setTime] = useState<T_TIME>({hours: null, minutes: null})
    const [progress, setProgress] = useState<number>(0)

    let interval : ReturnType<typeof setInterval>;

    const init = () => {
        const now = new Date()
        setTime({
            hours: now.getHours().toString().padStart(2, "0"),
            minutes: now.getMinutes().toString().padStart(2, "0")
        })
    }

    const handle_time_change = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        const [hours, minutes] = value.split(":")

        setTime({
            hours, minutes
        })
    }

    const handle_schedule = async () : Promise<void> => {
        const conn = await test_server_connection()
        if(conn === false) {
            window.alert("No server connection. Cannot schedule experiment start.")
            return
        }
        // Get current moment
        const now = new Date()

        // Get scheduled time
        let scheduled = new Date(new Date().setHours(Number(time.hours)))
        scheduled = new Date(scheduled.setMinutes(Number(time.minutes)))
        scheduled = new Date(scheduled.setSeconds(0))
        scheduled = new Date(scheduled.setMilliseconds(0))

        if(scheduled < now){
            window.alert("Cant schedule to the past")
            return
        }

        const total = (scheduled.getTime() - now.getTime()) // miliseconds until start
        let count = 0
        interval = setInterval(() => {
            count += 100
            const progress = (count/total)*100
            if(progress >= 100){
                setProgress(100)
                clearInterval(interval)
                start_experiment()  // <-- starting experiment
                return
            }
            setProgress(progress)
        }, 100)

        setScheduled(true)
    }



    return {
        init,
        handle_schedule,
        handle_time_change,
        scheduled,
        time,
        progress
    }
}