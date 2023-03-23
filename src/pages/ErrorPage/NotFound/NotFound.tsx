import React from 'react'
import ErrorLayout from '../ErrorLayout/ErrorLayout'
import Button from '../../../ui-kit/standard/Button'
import { useNavigate } from 'react-router-dom'
import { styledBigButton, StyledButtonsGrid } from '../ErrorLayout/styled'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <ErrorLayout title={'404'} subtitle={'Страница не найдена'}>
      <StyledButtonsGrid>
        <Button
          buttonStyle={'main'}
          styledFragment={styledBigButton}
          onClick={() => navigate(-1)}
        >
          Назад
        </Button>
        <Button
          styledFragment={styledBigButton}
          buttonStyle={'secondary'}
          onClick={() => navigate('/')}
        >
          На главную
        </Button>
      </StyledButtonsGrid>
    </ErrorLayout>
  )
}

export default NotFound
