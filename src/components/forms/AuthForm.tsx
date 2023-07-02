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
                    bg-neutral-300
                    drop-shadow-[0_0_8px_rgba(20,20,20,0.50)]
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
                        label="E-mail"
                        type="email"
                        lowercase
                        disabled={isLoading}
                        {...register("email" , { required: true })}
                        errors={errors.email}
                    />
                    <Input
                        label="Senha"
                        type="password"
                        autoComplete="password"
                        disabled={isLoading}
                        {...register("password" , { required: true })}
                        errors={errors.password}
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