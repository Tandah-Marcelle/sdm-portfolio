import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  private readonly projects = [
    {
      id: 1,
      title: 'Charcoal Cocoa Dryer',
      description: 'An industrial-grade cocoa dryer powered by charcoal, designed for high efficiency and uniform drying in rural areas.',
      image: '/images/cocoa-dryer.jpg',
      tags: ['Mechanisms', 'Thermal Systems', 'Agriculture'],
      details: 'Designed and simulated the mechanical structure and thermal flow to optimize drying time for cocoa beans.',
    },
    {
      id: 2,
      title: 'Plastic Extrusion Machine',
      description: 'A robust machine for processing recycled plastics into usable filaments or profiles, focusing on sustainability and Industry 4.0 integration.',
      image: '/images/plastic-extruder.jpg',
      tags: ['Manufacturing', 'SolidWorks', 'PLC'],
      details: 'Integrated PLC controls and automated temperature regulation for consistent extrusion quality.',
    },
    {
      id: 3,
      title: 'Autonomous Aquatic Boat',
      description: 'A self-navigating boat equipped with computer vision and sensors for aquatic monitoring and data collection.',
      image: '/images/aquatic-boat.jpg',
      tags: ['Embedded Systems', 'Computer Vision', 'Robotics'],
      details: 'Developed using C++ and Python, featuring obstacle avoidance and GPS-based waypoint navigation.',
    },
  ];

  findAll() {
    return this.projects;
  }
}
