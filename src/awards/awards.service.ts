import { Injectable } from '@nestjs/common';

@Injectable()
export class AwardsService {
    private readonly awards = [
        {
            id: 1,
            title: '1st Place - National Robotics Competition',
            organization: 'Government of Cameroon / Ministry of Scientific Innovation',
            year: '2023',
            description: 'Awarded for the design and implementation of an autonomous robotics system for agricultural automation.',
        },
        {
            id: 2,
            title: '2nd Place - National Innovation Challenge',
            organization: 'IUC Tech Expo',
            year: '2024',
            description: 'Recognized for the Plastic Extrusion Machine project, focusing on sustainable manufacturing.',
        },
    ];

    private readonly certifications = [
        {
            id: 1,
            name: 'Certified SOLIDWORKS Professional (CSWP)',
            issuer: 'Dassault Systèmes',
            year: '2022',
            badge: '/badges/cswp.png',
        },
        {
            id: 2,
            name: 'Certified SOLIDWORKS Associate (CSWA)',
            issuer: 'Dassault Systèmes',
            year: '2021',
            badge: '/badges/cswa.png',
        },
        {
            id: 3,
            name: '3DExperience Platform Explorer',
            issuer: 'Dassault Systèmes',
            year: '2023',
            badge: '/badges/3dexperience.png',
        },
    ];

    findAll() {
        return {
            awards: this.awards,
            certifications: this.certifications,
        };
    }
}
