import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.certification.deleteMany();
    await prisma.award.deleteMany();
    await prisma.project.deleteMany();
    await prisma.profile.deleteMany();

    // Default profile
    await prisma.profile.create({
        data: {
            name: 'Manuel Songfack Dongmo',
            title: 'Electromechanical Engineer · Industry 4.0 Specialist',
            bio: 'I am a passionate Electromechanical Engineer from Cameroon, specializing in advanced machine design, embedded firmware, and smart manufacturing. My mission is to bridge classical mechanical engineering with the future of Intelligent Industrial Automation.',
            bio2: 'With hands-on experience building functional prototypes — from the Charcoal Cocoa Dryer to a Dual-Extrusion 3D Printer — I focus on scalable, high-efficiency solutions that define the next generation of manufacturing technologies.',
            photo: 'https://images.unsplash.com/photo-1581092580497-e0d23cb61462?q=80&w=1000&auto=format&fit=crop',
            specialty1: 'Machine Design & CNC Optimization',
            specialty2: 'Embedded Firmware & Microelectronics',
            specialty3: 'SolidWorks · 3DExperience · CAD/CAM',
            specialty4: 'Robotics · Computer Vision · IoT',
            yearsExp: '6+',
        },
    });


    // Projects from CV
    await prisma.project.createMany({
        data: [
            {
                title: 'Charcoal Based Cocoa Dryer',
                description: 'Designed and evaluated a charcoal-based cocoa dryer capable of processing 100 kg of cocoa over a two-day cycle. Developed thermal chambers and optimized airflow.',
                image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1000&auto=format&fit=crop',
                tags: 'Thermo;Manufacturing;SolidWorks',
                details: 'Achieved sustainable drying in low-electricity rural conditions using localized material selection (stainless steel, galvanized steel).',
            },
            {
                title: 'Plastic Extrusion Machine',
                description: 'Design and realisation of a machine for plastic transformation. Integrated heating, extrusion, and control systems.',
                image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
                tags: 'CNC;Machining;Automation',
                details: 'Modeled in SolidWorks; fabricated using CNC and machining tools. Awarded grade Excellent.',
            },
            {
                title: 'Autonomous Water Exploration Boat',
                description: 'Created an autonomous aquatic robot equipped with ultrasonic sensors, radar modules, and voice-tracking features.',
                image: 'https://images.unsplash.com/photo-1544333323-53700b702ec1?q=80&w=1000&auto=format&fit=crop',
                tags: 'Robotics;Arduino;Sensors',
                details: 'Designed for environmental monitoring with high technology for marine life preservation.',
            },
            {
                title: 'CNC Laser Engraver',
                description: 'Developed a functional CNC engraving system integrating stepper motors and belt-drive mechanisms.',
                image: 'https://images.unsplash.com/photo-1610473068565-df4be8175b0e?q=80&w=1000&auto=format&fit=crop',
                tags: 'Firmware;G-Code;Optics',
                details: 'Configured GRBL-based motion control firmware and calibrated axes for precision engraving.',
            },
            {
                title: 'Dual Extrusion 3D Printer',
                description: 'Developed a fully functional FDM 3D printer integrating dual extruders for multi-material printing.',
                image: 'https://images.unsplash.com/photo-1533035350223-af3c64469d12?q=80&w=1000&auto=format&fit=crop',
                tags: 'Firmware;Wifi;3DPrinting',
                details: 'Integrated Wi-Fi functionalities for remote management and monitoring.',
            }
        ],
    });

    // Awards from CV
    await prisma.award.createMany({
        data: [
            {
                title: 'IITA Award for Regional Innovation (2nd Place)',
                year: '2025',
                organization: 'Ministry of Scientific Research and Innovation',
                description: 'Awarded for regional impact in agricultural technology.',
            },
            {
                title: 'Innovation and Excellence Competition (2nd Place)',
                year: '2024',
                organization: 'MINPMEESA',
                description: 'Recognition for mechatronic design excellence.',
            },
            {
                title: 'National Solidarity Festival (1st Place)',
                year: '2023',
                organization: 'Sparte Robotic and AMMCO',
                description: 'First prize for maritime exploration technology.',
            },
            {
                title: 'National Robotics and AI Competition (1st Place)',
                year: '2023',
                organization: 'Sparte Robotics',
                description: 'Champion of the national level robotics contest.',
            },
        ],
    });

    // Certifications from CV
    await prisma.certification.createMany({
        data: [
            {
                name: 'SolidWorks CSWP (2025)',
                issuer: 'Dassault Systèmes',
                year: '2025',
                badge: '/badges/cswp.png',
            },
            {
                name: 'Certified 3DEXPERIENCE 3DSwymer',
                issuer: 'Dassault Systèmes',
                year: '2025',
                badge: '/badges/3dx.png',
            },
            {
                name: 'Certified Computer Vision & Image Processing',
                issuer: 'IUC',
                year: '2023',
                badge: '/badges/cv.png',
            },
        ],
    });

    console.log('Seed completed with CV data.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
