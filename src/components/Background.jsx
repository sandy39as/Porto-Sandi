import React, { useEffect, useRef } from "react"

const AnimatedBackground = () => {
	const blobRefs = useRef([])

	const initialPositions = [
		{ x: -4, y: 0 },
		{ x: -4, y: 0 },
		{ x: 20, y: -8 },
		{ x: 20, y: -8 },
	]

	useEffect(() => {
		let currentScroll = 0
		let requestId

		const handleScroll = () => {
			const newScroll = window.pageYOffset
			currentScroll = newScroll

			blobRefs.current.forEach((blob, index) => {
				if (!blob) return

				const initialPos = initialPositions[index]

				const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340
				const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40

				const x = initialPos.x + xOffset
				const y = initialPos.y + yOffset

				blob.style.transform = `translate(${x}px, ${y}px)`
				blob.style.transition = "transform 1.4s ease-out"
			})

			requestId = requestAnimationFrame(handleScroll)
		}

		window.addEventListener("scroll", handleScroll)

		return () => {
			window.removeEventListener("scroll", handleScroll)
			cancelAnimationFrame(requestId)
		}
	}, [])

	return (
		<div className="fixed inset-0 bg-[#050505]">
			<div className="absolute inset-0">
				<div
					ref={(ref) => (blobRefs.current[0] = ref)}
					className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-white rounded-full mix-blend-screen filter blur-[140px] opacity-[0.08] md:opacity-[0.06]"
				/>

				<div
					ref={(ref) => (blobRefs.current[1] = ref)}
					className="absolute top-0 -right-4 w-96 h-96 bg-neutral-300 rounded-full mix-blend-screen filter blur-[150px] opacity-[0.07] md:opacity-[0.05] hidden sm:block"
				/>

				<div
					ref={(ref) => (blobRefs.current[2] = ref)}
					className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-neutral-500 rounded-full mix-blend-screen filter blur-[150px] opacity-[0.08] md:opacity-[0.05]"
				/>

				<div
					ref={(ref) => (blobRefs.current[3] = ref)}
					className="absolute -bottom-10 right-20 w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-[160px] opacity-[0.05] md:opacity-[0.035] hidden sm:block"
				/>
			</div>

			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />

			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_75%)]" />
		</div>
	)
}

export default AnimatedBackground