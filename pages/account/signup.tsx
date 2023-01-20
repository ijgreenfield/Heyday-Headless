import { Container, Layout } from '@components/common'
import { FC } from 'react'

const SignUp: FC = () => {
    return (
        <div>
            <div className='bg-neutral-tertiary'>
                <Container>
                    <div className='py-14'>
                        <h1 className='text-2xl'>Sign In</h1>
                    </div>
                </Container>
            </div>
            <div>
                <Container>
                    <form>
                        <div></div>
                        <div>
                            <label></label>
                            <input type="text" placeholder=''/>
                        </div>
                    </form>
                </Container>
            </div>
        </div>
    )
}

export default SignUp;