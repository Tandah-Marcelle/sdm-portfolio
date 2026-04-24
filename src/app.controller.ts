import { Controller, Get, Render, Param, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
    constructor(private readonly prisma: PrismaService) {}

    private async getProfile() {
        let profile = await this.prisma.client.profile.findFirst();
        if (!profile) {
            profile = await this.prisma.client.profile.create({ data: {} });
        }
        return profile;
    }

    @Get()
    @Render('index')
    async getIndex() {
        const [projects, awards, certifications, profile] = await Promise.all([
            this.prisma.client.project.findMany({ orderBy: { createdAt: 'desc' } }),
            this.prisma.client.award.findMany({ orderBy: { createdAt: 'desc' } }),
            this.prisma.client.certification.findMany({ orderBy: { createdAt: 'desc' } }),
            this.getProfile(),
        ]);
        return { name: profile.name, title: profile.title, projects, awards, certifications, profile };
    }

    @Get('certifications/:id')
    @Render('certifications/show')
    async getCertification(@Param('id') id: string) {
        const cert = await this.prisma.client.certification.findUnique({ where: { id: parseInt(id) } });
        if (!cert) throw new NotFoundException();
        const profile = await this.getProfile();
        return { name: profile.name, cert };
    }
}
