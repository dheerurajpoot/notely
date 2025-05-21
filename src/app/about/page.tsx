import Link from "next/link";
import {
	BookOpen,
	Users,
	Award,
	BookMarked,
	GraduationCap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AboutPage() {
	return (
		<div className='container mx-auto px-4 py-12'>
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-4xl font-bold mb-6'>About Notely</h1>

				<div className='prose prose-lg max-w-none'>
					<p className='text-lg text-muted-foreground mb-8'>
						Notely is a student-focused marketplace designed to help
						students buy and sell high-quality study materials. Our
						mission is to make education more accessible and
						affordable while helping students earn money from their
						academic work.
					</p>

					<div className='grid md:grid-cols-2 gap-8 my-12'>
						<div className='bg-sky-50 p-6 rounded-lg'>
							<Users className='h-10 w-10 text-sky-600 mb-4' />
							<h3 className='text-xl font-semibold mb-2'>
								For Students
							</h3>
							<p>
								Access high-quality study materials created by
								top students from universities around the world.
								Save time and improve your grades with
								comprehensive notes, solved assignments, and
								more.
							</p>
						</div>

						<div className='bg-sky-50 p-6 rounded-lg'>
							<Award className='h-10 w-10 text-sky-600 mb-4' />
							<h3 className='text-xl font-semibold mb-2'>
								For Sellers
							</h3>
							<p>
								Turn your hard work into income by selling your
								notes, assignments, and other study materials.
								Help other students while earning money from
								your academic efforts.
							</p>
						</div>
					</div>

					<h2 className='text-2xl font-bold mt-12 mb-6'>Our Story</h2>

					<p className='mb-4'>
						Notely was founded in 2023 by a group of university
						students who recognized the need for a reliable platform
						where students could exchange high-quality study
						materials. What started as a small project has grown
						into a thriving marketplace serving students across the
						globe.
					</p>

					<p className='mb-4'>
						Our founders experienced firsthand the challenges of
						finding reliable study resources and saw an opportunity
						to create a platform that benefits both students seeking
						quality materials and those looking to monetize their
						academic work.
					</p>

					<h2 className='text-2xl font-bold mt-12 mb-6'>
						Our Values
					</h2>

					<div className='grid md:grid-cols-3 gap-6 my-8'>
						<div className='text-center'>
							<div className='bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<BookOpen className='h-8 w-8 text-sky-600' />
							</div>
							<h3 className='font-semibold mb-2'>
								Quality Education
							</h3>
							<p className='text-sm text-muted-foreground'>
								We believe in the power of high-quality
								educational resources to transform learning
								outcomes.
							</p>
						</div>

						<div className='text-center'>
							<div className='bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<BookMarked className='h-8 w-8 text-sky-600' />
							</div>
							<h3 className='font-semibold mb-2'>
								Academic Integrity
							</h3>
							<p className='text-sm text-muted-foreground'>
								We promote ethical use of study materials and
								respect for intellectual property.
							</p>
						</div>

						<div className='text-center'>
							<div className='bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<GraduationCap className='h-8 w-8 text-sky-600' />
							</div>
							<h3 className='font-semibold mb-2'>
								Student Success
							</h3>
							<p className='text-sm text-muted-foreground'>
								Everything we do is focused on helping students
								achieve their academic goals.
							</p>
						</div>
					</div>

					<h2 className='text-2xl font-bold mt-12 mb-6'>
						Join Our Community
					</h2>

					<p className='mb-6'>
						Whether you&apos;re looking to find study materials or
						share your own work, Notely is the platform for you.
						Join thousands of students who are already part of our
						growing community.
					</p>

					<div className='flex flex-col sm:flex-row gap-4 mt-8'>
						<Button
							asChild
							size='lg'
							className='bg-sky-600 hover:bg-sky-700'>
							<Link href='/signup'>Sign Up Now</Link>
						</Button>
						<Button asChild size='lg' variant='outline'>
							<Link href='/contact'>Contact Us</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
