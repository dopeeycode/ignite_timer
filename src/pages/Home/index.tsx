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
import { ChangeEvent, FormEvent, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createCycleUserScheme = z.object({
  task: z.string()
  .min(1),
  minutesAmount: z.number()
  .max(60)
  .min(5)
})

type CreateCycleFormData = z.infer<typeof createCycleUserScheme>


export default function Home() {
  const [formData, setFormData] = useState({})
  const 
  { register, 
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

  function handleCreateNewCycle (data: CreateCycleFormData) {
    setFormData(data)
    reset()
  }

  console.log(formData)

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
            {...register('minutesAmount', { valueAsNumber: true , required: true })}

          />
          
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <SeperatorCountdown>:</SeperatorCountdown>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play />
          Começar
           
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
