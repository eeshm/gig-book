"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { logoutUser } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Music, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        setMenuOpen(false);
        router.push("/");
    };

    return (
        <nav className="w-full border-b border-slate-700 bg-slate-900 shadow-md flex mx-auto justify-center items-center">
            <div className="mx-auto flex h-16 w-full container items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
                    <Music className="h-6 w-6 text-blue-500" />
                    GigBook
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {user ? (
                        <>
                            <span className="text-sm text-slate-300">
                                Welcome, <span className="font-semibold text-white">{user.name}</span>
                            </span>
                            <Link href="/dashboard">
                                <Button variant="outline" size="sm">
                                    Dashboard
                                </Button>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="outline" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="rounded p-2 hover:bg-slate-800 md:hidden"
                    type="button"
                >
                    {menuOpen ? (
                        <X className="h-6 w-6 text-white" />
                    ) : (
                        <Menu className="h-6 w-6 text-white" />
                    )}
                </button>
            </div>

            {menuOpen && (
                <div className="border-t border-slate-700 bg-slate-800 md:hidden">
                    <div className="mx-auto w-full max-w-7xl space-y-3 px-4 py-4">
                        {user ? (
                            <>
                                <p className="px-2 text-sm text-slate-300">
                                    Welcome, <span className="font-semibold text-white">{user.name}</span>
                                </p>
                                <Link href="/dashboard" className="block">
                                    <Button variant="outline" size="sm" className="w-full">
                                        Dashboard
                                    </Button>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-2 px-2 py-2 text-sm text-slate-300 transition hover:text-white"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="outline" size="sm" className="w-full">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}