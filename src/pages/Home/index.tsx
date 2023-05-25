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

export default function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput id="task" list="task-suggestions" required placeholder='Dê um nome para o seu projeto' />
          <datalist id="task-suggestions">
            <option value="projeto 1"/>
            <option value="projeto 2"/>
            <option value="projeto 3"/>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
            type="number" 
            placeholder='00' 
            id="minutesAmount" 
            required
            min={5}
            max={60}
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

        <StartCountdownButton type="submit">
          <Play />
          Começar
           
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
