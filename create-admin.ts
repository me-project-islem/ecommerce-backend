// Script pour créer un compte admin
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';

config({ path: '.env.production' });

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  entities: ['dist/src/**/*.entity.js'],
  synchronize: false,
});

async function createAdmin() {
  console.log('🔧 Connexion à la database...');
  await AppDataSource.initialize();
  
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    // Vérifier si admin existe déjà
    const existing = await queryRunner.query(
      `SELECT * FROM "user" WHERE email = $1`,
      ['admin@ecommerce.com']
    );

    if (existing.length > 0) {
      console.log('⚠️  Admin existe déjà!');
      console.log('📧 Email: admin@ecommerce.com');
      console.log('🔑 Password: (inchangé)');
      return;
    }

    // Hasher le password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('Admin@2026', saltRounds);

    // Créer admin
    await queryRunner.query(
      `INSERT INTO "user" (email, name, password, role) VALUES ($1, $2, $3, $4)`,
      ['admin@ecommerce.com', 'Administrator', hashedPassword, 'admin']
    );

    console.log('');
    console.log('✅ Compte Admin créé avec succès!');
    console.log('');
    console.log('═'.repeat(50));
    console.log('📧 Email:    admin@ecommerce.com');
    console.log('🔑 Password: Admin@2026');
    console.log('👤 Role:     admin');
    console.log('═'.repeat(50));
    console.log('');
    console.log('🔗 Connecte-toi sur: https://ton-site.vercel.app/Login');
    console.log('');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await queryRunner.release();
    await AppDataSource.destroy();
  }
}

createAdmin();
