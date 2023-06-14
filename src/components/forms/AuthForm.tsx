'use client'
import { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import { toast } from "react-hot-toast";


const AuthForm = () => {
    const session = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/')
        }
    }, [session?.status, router])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            if (callback?.error) {
                toast.error(callback.error)
                router.push('/login')
            }

            if (callback?.ok && !callback?.error) {
                toast.success('Logado!')
                router.push('/')
            }
        })
        .finally(() => setIsLoading(false))
        
    }

    return (
        <div
            className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-md
            "
        >
            <div
                className="
                    bg-white
                    px-4
                    py-8
                    shadow
                    sm:rounded-lg
                    sm:px-10
                "
            >
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input 
                        id="email"
                        label="E-mail"
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                        required
                    />
                    <Input 
                        id="password"
                        label="Senha"
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                        required
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            Entrar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthForm;