import React from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorLayout from '../ErrorLayout/ErrorLayout'
import Button from '../../../ui-kit/standard/Button'
import { styledBigButton, StyledButtonsGrid } from '../ErrorLayout/styled'

const UnknownError = () => {
  const navigate = useNavigate()

  return (
    <ErrorLayout subtitle={'Неизвестная ошибка'}>
      <StyledButtonsGrid>
        <Button
          styledFragment={styledBigButton}
          buttonStyle={'main'}
          onClick={() => navigate('/')}
        >
          На главную
        </Button>
      </StyledButtonsGrid>
    </ErrorLayout>
  )
}

export default UnknownError
