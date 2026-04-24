-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'Manuel Songfack Dongmo',
    "title" TEXT NOT NULL DEFAULT 'Electromechanical Engineer · Industry 4.0 Specialist',
    "bio" TEXT NOT NULL DEFAULT '',
    "bio2" TEXT NOT NULL DEFAULT '',
    "photo" TEXT NOT NULL DEFAULT '',
    "specialty1" TEXT NOT NULL DEFAULT 'Machine Design & CNC Optimization',
    "specialty2" TEXT NOT NULL DEFAULT 'Embedded Firmware & Microelectronics',
    "specialty3" TEXT NOT NULL DEFAULT 'SolidWorks · 3DExperience · CAD/CAM',
    "specialty4" TEXT NOT NULL DEFAULT 'Robotics · Computer Vision · IoT',
    "yearsExp" TEXT NOT NULL DEFAULT '6+'
);
