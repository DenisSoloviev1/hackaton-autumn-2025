import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import { useAuthContext } from '@/app/providers/auth';

export const Header = () => {
    const { user, logout } = useAuthContext();

    return (
        <Navbar
            classNames={{
                item: [
                    "flex",
                    "relative",
                    "h-full",
                    "items-center",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[2px]",
                    "data-[active=true]:after:bg-primary",
                ],
            }}
        >
            <NavbarBrand>
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">MeetPro</span>
                </div>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#features">
                        Возможности
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#pricing">
                        Тарифы
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#enterprise">
                        Для бизнеса
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {!!user ? (
                    <NavbarItem>
                        <Button color="primary" variant="flat" onPress={logout}>
                            Выйти
                        </Button>
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Link href="/auth">Войти</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="/auth" variant="flat">
                                Регистрация
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
        </Navbar>
    );
}