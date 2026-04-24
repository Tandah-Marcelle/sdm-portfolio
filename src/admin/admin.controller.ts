import {
    Controller, Get, Post, Body, Render, Redirect,
    Param, UseInterceptors, UploadedFile, UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly prisma: PrismaService,
        private readonly cloudinary: CloudinaryService,
    ) {}

    private async getProfile() {
        let profile = await this.prisma.client.profile.findFirst();
        if (!profile) profile = await this.prisma.client.profile.create({ data: {} });
        return profile;
    }

    // ── AUTH ──────────────────────────────────────────────────

    @Get('login')
    @Render('admin/login')
    getLogin() { return { name: 'Manuel Songfack Dongmo', error: null }; }

    @Post('login')
    @Redirect('/admin')
    login(@Body('password') password: string) {
        if (password === 'admin123') return { url: '/admin' };
        return { url: '/admin/login?error=Invalid Credentials' };
    }

    // ── DASHBOARD ─────────────────────────────────────────────

    @Get()
    @Render('admin/index')
    async getDashboard() {
        const [projects, awards, certifications, profile] = await Promise.all([
            this.prisma.client.project.findMany({ orderBy: { createdAt: 'desc' } }),
            this.prisma.client.award.findMany({ orderBy: { createdAt: 'desc' } }),
            this.prisma.client.certification.findMany({ orderBy: { createdAt: 'desc' } }),
            this.getProfile(),
        ]);
        return { name: profile.name, projects, awards, certifications, profile };
    }

    // ── PROFILE (ABOUT) ───────────────────────────────────────

    @Get('profile')
    @Render('admin/edit-profile')
    async editProfileForm() {
        const profile = await this.getProfile();
        return { name: profile.name, profile };
    }

    @Post('profile')
    @Redirect('/admin')
    @UseInterceptors(FileInterceptor('photo', { storage: memoryStorage() }))
    async updateProfile(
        @UploadedFile() file: Express.Multer.File,
        @Body('name') name: string,
        @Body('title') title: string,
        @Body('bio') bio: string,
        @Body('bio2') bio2: string,
        @Body('photoUrl') photoUrl: string,
        @Body('specialty1') specialty1: string,
        @Body('specialty2') specialty2: string,
        @Body('specialty3') specialty3: string,
        @Body('specialty4') specialty4: string,
        @Body('yearsExp') yearsExp: string,
    ) {
        const profile = await this.getProfile();
        const photo = file
            ? (await this.cloudinary.uploadFile(file, 'sdm-portfolio/profile')).secure_url
            : (photoUrl || profile.photo);
        await this.prisma.client.profile.update({
            where: { id: profile.id },
            data: { name, title, bio, bio2, photo, specialty1, specialty2, specialty3, specialty4, yearsExp },
        });
    }

    // ── PROJECTS ──────────────────────────────────────────────

    @Get('projects/new')
    @Render('admin/new-project')
    newProjectForm() { return { name: 'Manuel Songfack Dongmo' }; }

    @Post('projects')
    @Redirect('/admin')
    @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
    async createProject(
        @UploadedFile() file: Express.Multer.File,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('imageUrl') imageUrl: string,
        @Body('tags') tags: string,
        @Body('details') details: string,
    ) {
        const image = file
            ? (await this.cloudinary.uploadFile(file, 'sdm-portfolio/projects')).secure_url
            : imageUrl;
        await this.prisma.client.project.create({ data: { title, description, image, tags, details } });
    }

    @Get('projects/:id/edit')
    @Render('admin/edit-project')
    async editProjectForm(@Param('id') id: string) {
        const project = await this.prisma.client.project.findUnique({ where: { id: parseInt(id) } });
        return { name: 'Manuel Songfack Dongmo', project };
    }

    @Post('projects/:id/edit')
    @Redirect('/admin')
    @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
    async updateProject(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('imageUrl') imageUrl: string,
        @Body('tags') tags: string,
        @Body('details') details: string,
    ) {
        const image = file
            ? (await this.cloudinary.uploadFile(file, 'sdm-portfolio/projects')).secure_url
            : imageUrl;
        await this.prisma.client.project.update({ where: { id: parseInt(id) }, data: { title, description, image, tags, details } });
    }

    @Post('projects/:id/delete')
    @Redirect('/admin')
    async deleteProject(@Param('id') id: string) {
        await this.prisma.client.project.delete({ where: { id: parseInt(id) } });
    }

    // ── AWARDS ────────────────────────────────────────────────

    @Get('awards/new')
    @Render('admin/new-award')
    newAwardForm() { return { name: 'Manuel Songfack Dongmo' }; }

    @Post('awards')
    @Redirect('/admin')
    @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
    async createAward(
        @UploadedFile() file: Express.Multer.File,
        @Body('title') title: string,
        @Body('organization') organization: string,
        @Body('year') year: string,
        @Body('description') description: string,
        @Body('imageUrl') imageUrl: string,
    ) {
        const image = file
            ? (await this.cloudinary.uploadFile(file, 'sdm-portfolio/awards')).secure_url
            : (imageUrl || '');
        await this.prisma.client.award.create({ data: { title, organization, year, description, image } });
    }

    @Get('awards/:id/edit')
    @Render('admin/edit-award')
    async editAwardForm(@Param('id') id: string) {
        const award = await this.prisma.client.award.findUnique({ where: { id: parseInt(id) } });
        return { name: 'Manuel Songfack Dongmo', award };
    }

    @Post('awards/:id/edit')
    @Redirect('/admin')
    @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
    async updateAward(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body('title') title: string,
        @Body('organization') organization: string,
        @Body('year') year: string,
        @Body('description') description: string,
        @Body('imageUrl') imageUrl: string,
    ) {
        const image = file
            ? (await this.cloudinary.uploadFile(file, 'sdm-portfolio/awards')).secure_url
            : imageUrl;
        await this.prisma.client.award.update({ where: { id: parseInt(id) }, data: { title, organization, year, description, image } });
    }

    @Post('awards/:id/delete')
    @Redirect('/admin')
    async deleteAward(@Param('id') id: string) {
        await this.prisma.client.award.delete({ where: { id: parseInt(id) } });
    }

    // ── CERTIFICATIONS ────────────────────────────────────────

    @Get('certifications/new')
    @Render('admin/new-certification')
    newCertificationForm() { return { name: 'Manuel Songfack Dongmo' }; }

    @Post('certifications')
    @Redirect('/admin')
    @UseInterceptors(FileFieldsInterceptor(
        [{ name: 'badge', maxCount: 1 }, { name: 'certImage', maxCount: 1 }],
        { storage: memoryStorage() }
    ))
    async createCertification(
        @UploadedFiles() files: { badge?: Express.Multer.File[], certImage?: Express.Multer.File[] },
        @Body('name') name: string,
        @Body('issuer') issuer: string,
        @Body('year') year: string,
        @Body('badgeUrl') badgeUrl: string,
        @Body('description') description: string,
    ) {
        const badgeFile = files?.badge?.[0];
        const imageFile = files?.certImage?.[0];
        const badge = badgeFile
            ? (await this.cloudinary.uploadFile(badgeFile, 'sdm-portfolio/badges')).secure_url
            : (badgeUrl || '');
        const image = imageFile
            ? (await this.cloudinary.uploadFile(imageFile, 'sdm-portfolio/certifications')).secure_url
            : '';
        await this.prisma.client.certification.create({ data: { name, issuer, year, badge, description: description || '', image } });
    }

    @Get('certifications/:id/edit')
    @Render('admin/edit-certification')
    async editCertificationForm(@Param('id') id: string) {
        const cert = await this.prisma.client.certification.findUnique({ where: { id: parseInt(id) } });
        return { name: 'Manuel Songfack Dongmo', cert };
    }

    @Post('certifications/:id/edit')
    @Redirect('/admin')
    @UseInterceptors(FileFieldsInterceptor(
        [{ name: 'badge', maxCount: 1 }, { name: 'certImage', maxCount: 1 }],
        { storage: memoryStorage() }
    ))
    async updateCertification(
        @Param('id') id: string,
        @UploadedFiles() files: { badge?: Express.Multer.File[], certImage?: Express.Multer.File[] },
        @Body('name') name: string,
        @Body('issuer') issuer: string,
        @Body('year') year: string,
        @Body('badgeUrl') badgeUrl: string,
        @Body('imageUrl') imageUrl: string,
        @Body('description') description: string,
    ) {
        const badgeFile = files?.badge?.[0];
        const imageFile = files?.certImage?.[0];
        const badge = badgeFile
            ? (await this.cloudinary.uploadFile(badgeFile, 'sdm-portfolio/badges')).secure_url
            : badgeUrl;
        const image = imageFile
            ? (await this.cloudinary.uploadFile(imageFile, 'sdm-portfolio/certifications')).secure_url
            : imageUrl;
        await this.prisma.client.certification.update({ where: { id: parseInt(id) }, data: { name, issuer, year, badge, image, description: description || '' } });
    }

    @Post('certifications/:id/delete')
    @Redirect('/admin')
    async deleteCertification(@Param('id') id: string) {
        await this.prisma.client.certification.delete({ where: { id: parseInt(id) } });
    }
}
