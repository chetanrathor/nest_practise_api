import { PartialType } from '@nestjs/swagger';
import { CreatePetSpecyDto } from './create-pet-specy.dto';

export class UpdatePetSpecyDto extends PartialType(CreatePetSpecyDto) {}
