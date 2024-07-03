import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/common/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null>{
    const user = await this.usersService.findOne(email);
    if(!user) throw new NotFoundException('User does not exists!')

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...userData } = user;
      return userData;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        name: user.name,
        email: user.email,
      }
    };
  }

  async signup({name, email, password}: SignupDto) {
    if(!name || !email || !password){
      throw new NotAcceptableException('Name, Email, and Password are Required')
    }

    if(await this.usersService.findOne(email)){
      throw new ConflictException('User already exist with this email. Please try logging in.')
    }
    
    const newUser = await this.usersService.create(name, email, password);
    const {password: passwordHash, ...userData} = newUser
    const payload = { email: newUser.email, sub: userData };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        name: newUser.name,
        email: newUser.email,
      }
    };   
  }
}
