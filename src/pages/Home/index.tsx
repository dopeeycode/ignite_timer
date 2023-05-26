import { Play } from 'phosphor-react'
import { 
  HomeContainer, 
  FormContainer,
  CountdownContainer, 
  SeperatorCountdown,
  StartCountdownButton,
  TaskInput,
  MinutesAmountInput
} from './styles'

import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { differenceInSeconds } from 'date-fns'

const createCycleUserScheme = z.object({
  task: z.string()
  .min(1),
  minutesAmount: z.number()
  .max(60)
  .min(5)
})

type CreateCycleFormData = z.infer<typeof createCycleUserScheme>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}


export default function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const { 
    register, 
    handleSubmit,
    watch,
    reset
  } 
    = useForm<CreateCycleFormData>({
    resolver: zodResolver(createCycleUserScheme),
    defaultValues: {
      minutesAmount: 0
    }
  })

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)


  useEffect(() => {
    if (activeCycle) {
      setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }
  }, [activeCycle])

  function handleCreateNewCycle (data: CreateCycleFormData) {
    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles(state => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    reset()
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')


  const task = watch('task')
  const isSubmitDisabled = !task
  
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            list="task-suggestions" 
            placeholder='Dê um nome para o seu projeto' 
            {...register('task')}
          />

          <datalist id="task-suggestions" />

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
            type="number" 
            placeholder='00' 
            id="minutesAmount"
            {...register('minutesAmount', { valueAsNumber: true })}

          />
          
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <SeperatorCountdown>:</SeperatorCountdown>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play />
          Começar
           
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
